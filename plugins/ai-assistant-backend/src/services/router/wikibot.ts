import express from 'express';
import Router from 'express-promise-router';
import {
  LoggerService,
  DatabaseService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { type DataIngestionPipeline } from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import multer from 'multer';
import mammoth from 'mammoth';
import { Model } from '@sweetoburrito/backstage-plugin-ai-assistant-node';

export type WikibotRouterOptions = {
  database: DatabaseService;
  logger: LoggerService;
  config: RootConfigService;
  dataIngestionTrigger: DataIngestionPipeline['trigger'];
  models: Model[];
};

const upload = multer({ storage: multer.memoryStorage() });

export async function createWikibotRouter(
  options: WikibotRouterOptions,
): Promise<express.Router> {
  const { database, logger, dataIngestionTrigger, config, models } = options;
  const router = Router();
  router.use(express.json());

  router.post('/ingest', async (req, res) => {
    const { ingestorId } = req.body;
    logger.info(
      `Manually triggering ingestion ${
        ingestorId ? `for '${ingestorId}'` : 'for all ingestors'
      }`,
    );

    // Trigger ingestion but don't wait for it to complete
    dataIngestionTrigger(ingestorId).catch(error => {
      logger.error('Manual ingestion trigger failed', error);
    });

    res.status(202).json({
      message: `Ingestion triggered ${
        ingestorId ? `for '${ingestorId}'` : 'for all ingestors'
      }. Check logs for progress.`,
    });
  });

  router.post(
    '/summarize',
    upload.single('transcript') as any,
    async (req, res) => {
      const summaryModelId =
        config.getOptionalString('aiAssistant.conversation.summaryModel') ??
        models[0]?.id;

      if (!summaryModelId) {
        logger.error('No summary model configured or available.');
        return res
          .status(500)
          .json({ message: 'No AI model available for summarization.' });
      }
      logger.info(`Using summary model: ${models}`);
      const model = models.find(m => m.id === summaryModelId);

      if (!model) {
        logger.error(
          `Configured summary model "${summaryModelId}" was not found.`,
        );
        return res
          .status(500)
          .json({ message: `AI model "${summaryModelId}" not found.` });
      }
      const chatModel = model.chatModel;

      const { content: textContent } = req.body;
      const file = req.file;
      let contentToSummarize = textContent;

      if (file) {
        if (
          file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.originalname.endsWith('.docx')
        ) {
          const { value } = await mammoth.extractRawText({
            buffer: file.buffer,
          });
          contentToSummarize = value;
        } else if (
          file.mimetype === 'text/vtt' ||
          file.originalname.endsWith('.vtt')
        ) {
          contentToSummarize = file.buffer.toString('utf-8');
        } else {
          return res.status(400).json({
            message:
              'Unsupported file type. Please upload a .docx or .vtt file.',
          });
        }
      }

      if (!contentToSummarize || contentToSummarize.trim() === '') {
        return res.status(400).json({ message: 'No content provided.' });
      }

      const prompt = `Please provide a concise summary of the following text. The summary should capture the key points and main ideas, suitable for a knowledge base entry:\n\n---\n\n${contentToSummarize}`;

      try {
        const summary = await chatModel.invoke(prompt);
        res.status(200).json({ summary: summary.content });
      } catch (error) {
        logger.error('Failed to generate summary', error as Error);
        res.status(500).json({ message: 'Failed to generate summary.' });
      }
    },
  );

  router.post('/documents', async (req, res) => {
    const { content, expert, approved } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Content cannot be empty.' });
    }

    const db = await database.getClient();
    const [insertedDoc] = await db('wikibot_documents')
      .insert({
        content,
        expert,
        approved: !!approved,
      })
      .returning('*');

    res.status(201).json({ document: insertedDoc });
  });

  router.put('/documents', async (req, res) => {
    const { id, approved } = req.body;

    const db = await database.getClient();
    const [updatedDoc] = await db('wikibot_documents')
      .where({ id })
      .update({
        approved: !!approved,
      })
      .returning('*');

    if (approved) {
      logger.info(
        `Document ${updatedDoc.id} was approved. Triggering wikibot ingestor.`,
      );
      // Trigger ingestion but don't wait for it to complete.
      dataIngestionTrigger('wikibot').catch(error => {
        logger.error(
          'Automatic ingestion trigger failed after document submission',
          error,
        );
      });
    }

    res.status(200).json({ document: updatedDoc });
  });

  return router;
}

import fs from 'fs';
import path from 'path';
import { createAssistantTool } from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import { z } from 'zod';
import { WikibotToolOptions } from '../types/wikibot';

export function createWikibotTool(options: WikibotToolOptions) {
  const { logger, config, database } = options;

  const folderPath = config.getOptionalString('aiAssistant.wikibot.folderPath');
  if (!folderPath) {
    throw new Error(
      'Desktop folder path not configured in app-config.yaml under aiAssistant.wikibot.folderPath',
    );
  }

  return createAssistantTool({
    tool: {
      name: 'wikibot-big-brain',
      description:
        'Scans a local folder for new or updated text files (.txt) and saves their content to a database for future reference. ' +
        'This makes the file content available for ingestion into the AI knowledge base after approval. ' +
        'Use this tool to add local documentation, notes, or text files to the system.',
      schema: z.object({}),
      func: async () => {
        const toolLogger = logger.child({ tool: 'wikibot-big-brain' });
        toolLogger.info(`Scanning files from ${folderPath} to save to database...`);
        try {
          const files = fs.readdirSync(folderPath);
          const textFiles = files.filter(
            file => path.extname(file).toLowerCase() === '.txt',
          );

          if (textFiles.length === 0) {
            return 'No text files found in the specified directory.';
          }

          const db = await database.getClient();
          let processedCount = 0;
          
          for (const file of textFiles) {
            const filePath = path.join(folderPath, file);
            try {
              const content = await fs.promises.readFile(filePath, 'utf-8');

              await db('wikibot_documents')
                .insert({
                  content: content,
                  approved: false,
                });

              processedCount++;
              toolLogger.info(`Successfully saved content from ${filePath}`);
            } catch (fileError: any) {
              toolLogger.error(
                `Failed to process file ${filePath}: ${fileError.message}`,
              );
            }
          }

          const resultMessage = `Successfully processed and saved content from ${processedCount} text files. The content is now pending approval for ingestion.`;
          toolLogger.info(resultMessage);

          //Test Ingestor Trigger
          // try {
          //   toolLogger.info('Triggering wikibot ingestor to run...');
          //   await fetch('http://localhost:7007/api/ai-assistant/ingest', {
          //     method: 'POST',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({ ingestorId: 'wikibot' }),
          //   });
          //   toolLogger.info('Successfully triggered wikibot ingestor.');
          // } catch (error) {
          //   toolLogger.error('Failed to trigger wikibot ingestor.', error as Error);
          // }

          return resultMessage;
        } catch (error: any) {
          toolLogger.error(
            `Error scanning directory ${folderPath}: ${error.message}`,
          );
          return `Error: Could not scan the directory. Details: ${error.message}`;
        }
      },
    },
  });
}
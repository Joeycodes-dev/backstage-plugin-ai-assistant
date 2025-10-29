import express from 'express';
import Router from 'express-promise-router';
import { createChatRouter, ChatRouterOptions } from './chat';
import { createModelRouter } from './models';
import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import {
  type DataIngestionPipeline
} from '@sweetoburrito/backstage-plugin-ai-assistant-node';

export type RouterOptions = ChatRouterOptions & {
  config: RootConfigService;
  logger: LoggerService;
  dataIngestionTrigger: DataIngestionPipeline['trigger'];
};

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.use('/chat', await createChatRouter(options));
  router.use('/models', await createModelRouter(options));

  router.post('/ingest', async (req, res) => {
    const { ingestorId } = req.body;
    options.logger.info(
      `Manually triggering ingestion ${
        ingestorId ? `for '${ingestorId}'` : 'for all ingestors'
      }`,
    );

    // Trigger ingestion but don't wait for it to complete
    options.dataIngestionTrigger(ingestorId).catch(error => {
      options.logger.error('Manual ingestion trigger failed', error);
    });

    res.status(202).json({
      message: `Ingestion triggered ${
        ingestorId ? `for '${ingestorId}'` : 'for all ingestors'
      }. Check logs for progress.`,
    });
  });

  const middleware = MiddlewareFactory.create(options);

  router.use(middleware.error());

  return router;
}

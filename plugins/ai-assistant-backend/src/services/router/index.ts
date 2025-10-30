import express from 'express';
import Router from 'express-promise-router';
import { createChatRouter, ChatRouterOptions } from './chat';
import { createModelRouter } from './models';
import {
  DatabaseService,
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import {
  type DataIngestionPipeline
} from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import { createWikibotRouter } from './wikibot';
import { Model } from '@sweetoburrito/backstage-plugin-ai-assistant-node';

export type RouterOptions = ChatRouterOptions & {
  database: DatabaseService
  config: RootConfigService;
  logger: LoggerService;
  dataIngestionTrigger: DataIngestionPipeline['trigger'];
  models: Model[];
};

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.use('/chat', await createChatRouter(options));
  router.use('/models', await createModelRouter(options));

  router.use('/wikibot', await createWikibotRouter(options));

  const middleware = MiddlewareFactory.create(options);

  router.use(middleware.error());

  return router;
}

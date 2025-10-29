import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { toolExtensionPoint } from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import { createWikibotTool } from './tools/wikibotBigBrain';

export const aiAssistantModuleToolProviderWikibot = createBackendModule({
  pluginId: 'ai-assistant',
  moduleId: 'tool-provider-wikibot',
  register(reg) {
    reg.registerInit({
      deps: {
        toolExtension: toolExtensionPoint,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        database: coreServices.database,
      },
      async init({ toolExtension, logger, config, database }) {
        const wikibotTool = createWikibotTool({ logger, config, database });
        toolExtension.register(wikibotTool);

        // For testing: run the tool immediately on startup
        logger.info('Running wikibot-big-brain tool on startup for testing...');
        try {
          // The tool's schema is an empty object, so we pass {} as the input.
          const result = await wikibotTool.func({});
          logger.info(`Wikibot tool run complete on startup: ${result}`);
        } catch (error) {
          logger.error('Error running wikibot tool on startup', error as Error);
        }
      },
    });
  },
});
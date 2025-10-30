import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { dataIngestorExtensionPoint } from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import { WikibotIngestor } from './services/wikibotIngestor';

export const aiAssistantModuleToolIngestorWikibot = createBackendModule({
  pluginId: 'ai-assistant',
  moduleId: 'ingestor-wikibot',
  register(reg) {
    reg.registerInit({
      deps: {
        dataIngestor: dataIngestorExtensionPoint,
        config: coreServices.rootConfig,
        logger: coreServices.logger,
        database: coreServices.database,
      },
      async init({ dataIngestor, config, logger, database }) {
        dataIngestor.registerIngestor(
          WikibotIngestor.fromConfig({
            config,
            logger,
            database,
          }),
        );
      },
    });
  },
});

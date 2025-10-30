import {
  type Ingestor,
  type EmbeddingDocument,
} from '@sweetoburrito/backstage-plugin-ai-assistant-node';
import { type Config } from '@backstage/config';
import { LoggerService, DatabaseService } from '@backstage/backend-plugin-api';
import { MODULE_ID } from '../constants/module';

export class WikibotIngestor implements Ingestor {
  private readonly logger: LoggerService;
  private readonly database: DatabaseService;

  get id(): string {
    return MODULE_ID;
  }

  private constructor(options: { config: Config; logger: LoggerService, database: DatabaseService }) {
    this.logger = options.logger.child({
      type: 'WikibotIngestor',
    });
    this.database = options.database;
  }

  static fromConfig(options: { config: Config; logger: LoggerService, database: DatabaseService }): WikibotIngestor {
    return new WikibotIngestor(options);
  }

  async ingest(): Promise<EmbeddingDocument[]> {
    this.logger.info('Ingesting approved documents from wikibot_documents table');
    const db = await this.database.getClient();
    const approvedDocuments = await db('wikibot_documents')
      .where({ approved: true })
      .select('id', 'content', 'expert');

    if (approvedDocuments.length === 0) {
      this.logger.info('No approved wikibot documents to ingest.');
      return [];
    }

    const documents: EmbeddingDocument[] = approvedDocuments.map(doc => ({
      metadata: {
        id: `wikibot-doc-${doc.id}`,
        source: this.id,
        expert: doc.expert,
      },
      content: doc.content,
    }));

    this.logger.info(
      `Ingested ${documents.length} approved documents from the database.`,
    );

    return documents;
  }
}
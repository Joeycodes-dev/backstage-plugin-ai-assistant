import { Config } from '@backstage/config';
import { LoggerService, DatabaseService } from '@backstage/backend-plugin-api';

export interface WikibotToolOptions {
  logger: LoggerService;
  config: Config;
  database: DatabaseService;
}
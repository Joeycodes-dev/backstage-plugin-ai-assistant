export interface Config {
  ingestors: {
    wikibot: {
      /**
       * The absolute path to the folder containing files to be ingested.
       * @visibility secret
       */
      folderPath: string;
      /**
       * Optional array of file extensions to ingest. Defaults to ['.md', '.txt'].
       * @visibility frontend
       */
      fileTypes?: string[];
    };
  };
}
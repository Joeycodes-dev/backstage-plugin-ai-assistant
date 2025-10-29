const tableName = 'wikibot_documents';

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async knex => {
  await knex.schema.dropTable(tableName);
};

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async knex => {
  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.text('content').notNullable();
    table.boolean('approved').notNullable().defaultTo(false);
    table.string('owner');
    table.string('expert');
    table.timestamps(true, true);
  });
};
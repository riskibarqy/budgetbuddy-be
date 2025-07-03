import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.string('username').notNullable().unique();
    table.jsonb('fingerprints').nullable();
  });

  // Rename column AFTER altering table (in Postgres this requires separate raw)
  await knex.schema.alterTable('users', (table) => {
    table.renameColumn('password_hash', 'password');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Revert changes
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('username');
    table.dropColumn('fingerprints');
  });

  await knex.schema.alterTable('users', (table) => {
    table.renameColumn('password', 'password_hash');
  });
}

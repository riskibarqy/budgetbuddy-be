// File: migrations/20250703_alter_user_id_to_string.ts

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', async (table) => {
    // Drop primary key constraint first (Postgres requires this)
    table.dropPrimary();

    // Drop 'id' column
    table.dropColumn('id');
  });

  // Then recreate 'id' as a string and primary
  await knex.schema.alterTable('users', (table) => {
    table.string('id', 255).primary(); // For Clerk IDs
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', async (table) => {
    table.dropPrimary();
    table.dropColumn('id');
  });

  await knex.schema.alterTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
  });
}

'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_categories', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.string('name');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_categories');
};

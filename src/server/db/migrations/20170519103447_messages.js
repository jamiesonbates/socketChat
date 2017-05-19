'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('chat_id')
      .references('id')
      .inTable('chats');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chats');
};

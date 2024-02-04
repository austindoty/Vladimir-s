exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    // ... other columns
    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters")
};

exports.up = function(knex, Promise) {
 return knex.schema.createTable('restavracija', (table) => {
    table.increments('id').primary();
    table.string('naziv_restavracije');
    table.string('naslov');
    table.string('mesto');
    table.decimal('vrednostObroka');
    table.decimal('vrednostDoplacila');
    }).createTable('meni', (table) => {
        table.increments('id').primary();
        table.string('juha');
        table.string('glavnaJed');
        table.string('solata');
        table.string('sladica');
        table.string('vrstaMenija');
        table.integer('restavracija_id').references('id').inTable('restavracija');
    }).createTable('uporabnik', (table) => {
        table.increments('id').primary();
        table.string('ime');
        table.string('priimek');
        table.string('email');
        table.string('upIme');
        table.string('geslo');
    }).createTable('ocena', (table) => {
        table.increments('id').primary();
        table.string('datum');
        table.int('stOcena');
        table.string('komentar');
        table.string('vrstaOcena');
        table.integer('restavracija_id').references('id').inTable('restavracija');
        table.integer('uporabnik_id').references('id').inTable('uporabnik');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('restavracija')
        .dropTable('meni');
};

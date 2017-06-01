let express = require('express'),
    router = express.Router()

let config = require('../knexfile');
let knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);

let Restavracija = bookshelf.Model.extend({
    tableName: 'restavracija', 
    idAttribute : "id",
    ocena: function(){
        return this.belongsToMany(Uporabnik).through(Ocena,"restavracija_id","uporabnik_id");
    }
}),
Ocena = bookshelf.Model.extend({
    tableName: 'ocena',
    idAttribute : "id",
    restavracija: function(){
        return this.belongsTo(Restavracija, "restavracija_id");
    },
    uporabnik: function(){
        return this.belongsTo(Uporabnik, "uporabnik_id");
    }
}),
Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabnik',
    idAttribute : "id", 
    ocena: function(){
        return this.belongsToMany(Restavracija).through(Ocena,"uporabnik_id", "restavracija_id");
    }
});

module.exports = Ocena; 
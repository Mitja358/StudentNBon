module.exports = {
    express = require('express'),
        router = express.Router(),

    config = require('../knexfile'),
        knex = require('knex')(config.development),
        bookshelf = require('bookshelf')(knex),

    Restavracija = bookshelf.Model.extend({
        tableName: 'restavracija', 
        idAttribute : "id",
        ocena: function(){
            return this.belongsToMany(Uporabnik).through(Ocena,"restavracija_id","uporabnik_id");
        }, 
        meni: function(){
            return this.hasMany(Meni);
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
    }), Meni = bookshelf.Model.extend({
        tableName: 'meni',
        restavracija: function(){
            return this.belongsTo(Restavracija);
        }
    })  
}; 



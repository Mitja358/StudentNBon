let express =require('express'),
    router = express.Router(),
    poljeMenijev = [];

let config = require('../knexfile'),
    knex = require('knex')(config.development),
    bookshelf = require('bookshelf')(knex);
    
let Restavracija = bookshelf.Model.extend({
    tableName: 'restavracija', 
    meni: function(){
        return this.hasMany(Meni);
    }
}),
Meni = bookshelf.Model.extend({
    tableName: 'meni',
    restavracija: function(){
        return this.belongsTo(Restavracija);
    }
});

module.exports = Meni; 
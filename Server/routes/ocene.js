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


router.get('/', (req, res, next) => {
    new Ocena()
    .fetchAll({ withRelated:['restavracija', 'uporabnik']})
    .then((data) => {
        res.json(data.toJSON());
    })
    .catch((err) => { 
        res.json(err); 
    });
});

router.post('/', (req, res, next) => {
    new Ocena({
        datum: req.body.datum,
        stOcena: req.body.stOcena,
        komentar: req.body.komentar,
        vrstaOcena: req.body.vrstaOcena,
        restavracija_id: req.body.restavracija_id,
        uporabnik_id: req.body.uporabnik_id
    })
    .save()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/:id', (req, res, next) => {
    new Ocena({id: req.params.id})
    .fetch({ withRelated:['restavracija', 'uporabnik']})
    .then((data) => {
        if (data) {
            res.json(data.toJSON());
        }
        else {
            res.status(404).json(err);
        }
    })
    .catch((err) => {
        res.json(err);
    });
});

router.put('/:id', (req, res, next) => {
    new Ocena({ id: req.params.id })
    .fetch({ require:true })
    .then(function (Ocena) {
        Ocena.save({
            datum: req.body.datum || Ocena.get('datum'),
            stOcena: req.body.stOcena || Ocena.get('stOcena'),
            komentar: req.body.komentar || Ocena.get('komentar'),
            vrstaOcena: req.body.vrstaOcena || Ocena.get('vrstaOcena'),
            restavracija_id: req.body.restavracija_id || Ocena.get('restavracija_id'),
            uporabnik_id: req.body.uporabnik_id || Ocena.get('uporabnik_id')
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
        res.json(err);
        });
    });
});

router.delete('/:id', (req, res, next) => {
    new Ocena({ id: req.params.id })
    .fetch({ require: true })
    .then(function (Ocena) {
        Ocena.destroy()
    .then((data) => {
        res.json(data);
    });
    })
    .catch(function (err) {
        res.json(err);
    });
});

module.exports = router; 

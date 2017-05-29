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
    new Uporabnik()
    .fetchAll()
    .then((data) => {
        res.json(data.toJSON());
    })
    .catch((err) => { 
        res.json(err); 
    });
});

router.post('/', (req, res, next) => {
    new Uporabnik({
        ime: req.body.ime,
        priimek: req.body.priimek,
        email: req.body.email,
        upIme: req.body.upIme,
        geslo: req.body.geslo,
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
    new Uporabnik({id: req.params.id})
    .fetch()
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
    new Uporabnik({ id: req.params.id })
    .fetch({ require:true })
    .then(function (Uporabnik) {
        Uporabnik.save({
            ime: req.body.ime || Restavracija.get('ime'),
            priimek: req.body.priimek || Restavracija.get('priimek'),
            email: req.body.email || Restavracija.get('email'),
            upIme: req.body.upIme || Restavracija.get('upIme'),
            geslo: req.body.geslo || Restavracija.get('geslo')
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
    new Uporabnik({ id: req.params.id })
    .fetch({ require: true })
    .then(function (Uporabnik) {
        Uporabnik.destroy()
    .then((data) => {
        res.json(data);
    });
    })
    .catch(function (err) {
        res.json(err);
    });
});

router.get('/upime/:upIme', (req, res, next) => {
    knex('uporabnik')
    .select('id')
    .where({'upIme':req.params.upIme})
    .then((data) => {
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json(err);
        }
    })
    .catch((err) => {
        res.json(err);
    });
});

// Preverjanje prijave
router.post('/prijava', (req, res, next) => {
   // console.log(req.body.email);
    knex('uporabnik')
    .select('upIme', 'geslo')
    .where({'upIme':req.body.upIme}).andWhere({'geslo':req.body.geslo})
    .then((data) => {
        //console.log(data[0].email);
        console.log(data);
        /*if (data) {
           // console.log(req.params.email);
            res.json(true);
        }
        else {
           // console.log(req.params.email);
            res.json(false);
        }*/
        if(data.length == 0)
            res.json(false)
        else
            res.json(true)
        
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router; 

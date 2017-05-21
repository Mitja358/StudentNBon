let express = require('express'),
    router = express.Router(),
    poljeRestavracij = [];

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

//@GET getRestaurants (all)
router.get('/', (req, res, next) => {
    new Restavracija()
    .fetchAll()
    .then((data) => {
        res.json(data.toJSON());
    })
    .catch((err) => { 
        res.json(err); 
    });
});

//@POST createRestaurant
router.post('/', (req, res, next) => {
    new Restavracija({
        naziv_restavracije: req.body.naziv_restavracije,
        naslov: req.body.naslov,
        mesto: req.body.mesto,
        vrednostObroka: req.body.vrednostObroka,
        vrednostDoplacila: req.body.vrednostDoplacila,
    })
    .save()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

//@GET getRestaurant by ID
router.get('/:id', (req, res, next) => {
    new Restavracija({id: req.params.id})
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

//@PUT updateRestaurant
router.put('/:id', (req, res, next) => {
    new Restavracija({ id: req.params.id })
    .fetch({ require:true })
    .then(function (Restavracija) {
        Restavracija.save({
            naziv_restavracije: req.body.naziv_restavracije || Restavracija.get('naziv_restavracije'),
            naslov: req.body.naslov || Restavracija.get('naslov'),
            mesto: req.body.mesto || Restavracija.get('mesto'),
            vrednostObroka: req.body.vrednostObroka || Restavracija.get('vrednostObroka'),
            vrednostDoplacila: req.body.vrednostDoplacila || Restavracija.get('vrednostDoplacila')
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
        res.json(err);
        });
    });
});

//@DELETE deleteRestaurant 
router.delete('/:id', (req, res, next) => {
    new Restavracija({ id: req.params.id })
    .fetch({ require: true })
    .then(function (Restavracija) {
        Restavracija.destroy()
    .then((data) => {
        res.json(data);
    });
    })
    .catch(function (err) {
        res.json(err);
    });
});

//@GET pridobi vse restavracije iz iskanega mesta
router.get('/kraj/:mesto', (req, res, next) => {
    knex('restavracija')
    .select()
    .where({'mesto':req.params.mesto})
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

module.exports = router; 
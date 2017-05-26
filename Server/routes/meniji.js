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

//@GET getMenus (all)
router.get('/', (req, res, next) => {
    new Meni()
    .fetchAll({ withRelated:['restavracija']})
    .then((data) => {
        res.json(data.toJSON());
    })
    .catch((err) => { 
        res.json(err); 
    });
});

//@POST createMenu
router.post('/', (req, res, next) => {
    new Meni({
        juha: req.body.juha,
        glavnaJed: req.body.glavnaJed,
        solata: req.body.solata,
        sladica: req.body.sladica,
        vrstaMenija: req.body.vrstaMenija,
        restavracija_id: req.body.restavracija_id
    })
    .save()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json(err);
    });
});

//@GET getMenu
router.get('/meni/:id', (req, res, next) => {
    new Meni({id: req.params.id})
    .fetch({ withRelated:['restavracija']})
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

//@PUT createMenu

router.put('/:id', (req, res, next) => {
    new Meni({ id: req.params.id })
    .fetch({ require:true })
    .then(function (Meni) {
        Meni.save({
            juha: req.body.juha || Meni.get('juha'),
            glavnaJed: req.body.glavnaJed || Meni.get('glavnaJed'),
            solata: req.body.solata || Meni.get('solata'),
            sladica: req.body.sladica || Meni.get('sladica'),
            vrstaMenija: req.body.vrstaMenija || Meni.get('vrstaMenija'),
            restavracija_id: req.body.restavracija_id || Meni.get('restavracija_id')
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
        res.json(err);
        });
    });
});

//@DELETE deleteMeni
router.delete('/:id', (req, res, next) => {
    new Meni({ id: req.params.id })
    .fetch({ require: true })
    .then(function (Meni) {
        Meni.destroy()
    .then((data) => {
        res.json(data);
    });
    })
    .catch(function (err) {
        res.json(err);
    });
});

//@GET pridobi vse menije določene restavracije
router.get('/restavracija/:restavracija_id', (req, res, next) => {
    knex('meni')
    .select()
    .where({'restavracija_id':req.params.restavracija_id})
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

//@GET pridobi vse vrste menijev
router.get('/restavracija/:restavracija_id/vrstaMenija', (req, res, next) => {
    knex('meni')
    .select()
    .distinct('vrstaMenija')
    .where({'restavracija_id':req.params.restavracija_id})
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
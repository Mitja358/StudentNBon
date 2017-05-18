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

//@GET getRestaurant 
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

/*
let restavracija1 = new Restavracija(1, 'London Street Food', 'Strossmayerjeva ulica 26', 'Maribor', 5.60, 2.97);
    restavracija2 = new Restavracija(2, 'Lunch box', 'Gosposvetska cesta 19', 'Maribor', 2.63, 0.00);
    restavracija3 = new Restavracija(3, 'Restavracija Mr. Falafel', 'Gosposka ulica 30', 'Maribor', 6.13, 3.50);
    poljeRestavracij.push(restavracija1);
    poljeRestavracij.push(restavracija2);
    poljeRestavracij.push(restavracija3);

//@GET getRestaurant 
router.get('/:id', (req, res, next)=>{
    if(req.params.id<poljeRestavracij.length+1 && req.params.id>=1){
        res.json(poljeRestavracij[req.params.id-1]);
    }else{
        res.send('Restavracija ne obstaja!');
        //res.sendStatus(404);
    }
});

//@GET getRestaurants (all)
router.get('/', (req, res, next)=>{
    res.json(poljeRestavracij);
});

//@POST createRestaurant 
router.post('/', (req, res, next)=>{
    let restavracijax = new Restavracija(poljeRestavracij.length +1, req.body.naziv, req.body.naslov, req.body.mesto, req.body.vrednostObroka, req.body.vrednostDoplacila);
    poljeRestavracij.push(restavracijax)
    res.json( restavracijax);
});

//@PUT updateRestaurant 
router.put('/:id', (req, res, next)=>{
var restavracijaId = poljeRestavracij[req.params.id-1]; 
    restavracijaId.id = req.body.id;
    restavracijaId.naziv = req.body.naziv;
    restavracijaId.naslov = req.body.naslov;
    restavracijaId.mesto = req.body.mesto;
    restavracijaId.vrednostObroka = req.body.vrednostObroka;
    restavracijaId.vrednostDoplacila = req.body.vrednostDoplacila; 

    res.json(restavracijaId);
}); 

//@DELETE deleteRestaurant 
router.delete('/:id', (req, res, next)=>{
    if(req.params.id<poljeRestavracij.length+1 && req.params.id>=1){     
        delete poljeRestavracij[req.params.id-1];
        res.send('Restavracija je izbrisana!');  
    }else{
        //res.sendStatus(404);
        res.send('Restavracija ne obstaja!');
    }
});
*/


module.exports = router; 
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
router.get('/:id', (req, res, next) => {
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


/*var Meni = require('../classes/Meni.js');

let meni1 = new Meni(1, 'dnevna zelenjavna juha', 'riž chilli con carne', 'dnevna mešana solata', 'sadje', 'mesni');
    meni2 = new Meni(2, 'dnevna zelenjavna juha', 'riž peanut', 'dnevna mešana solata', 'sadje', 'veganski');
    meni3 = new Meni(3, 'dnevna zelenjavna juha', 'riž ratatouile', 'dnevna mešana solata', 'sadje', 'vegetarijanski');
    poljeMenijev.push(meni1);
    poljeMenijev.push(meni2);
    poljeMenijev.push(meni3);

//@GET getMenu (all)
router.get('/', (req, res, next)=>{
    res.json(poljeMenijev); 
});

//@POST createMenu
router.post('/', (req, res, next)=>{
    let menix = new Meni(poljeMenijev.length +1, req.body.juha, req.body.glavnaJed, req.body.solata, req.body.sladica, req.body.vrsta);
    poljeMenijev.push(menix)
    res.json(menix);
});

//@GET getMenu 
router.get('/:id', (req, res, next)=>{
    if(req.params.id<poljeMenijev.length+1 && req.params.id>=1){
        res.json(poljeMenijev[req.params.id-1]); 
    }else{
        res.send('Meni ne obstaja!');
        //res.sendStatus(404);
    }
});

//@PUT updateMenu
router.put('/:id', (req, res, next)=>{
    if(req.params.id<poljeMenijev.length+1 && req.params.id>=1){
        var meniId = poljeMenijev[req.params.id-1]; 

            meniId.id = req.body.id;
            meniId.juha = req.body.juha;
            meniId.glavnaJed = req.body.glavnaJed;
            meniId.solata = req.body.solata;
            meniId.sladica = req.body.sladica;
            meniId.vrsta = req.body.vrsta;

        res.json(poljeMenijev[meniId]); 
    }else{
        //res.sendStatus(404);
        res.send('Meni ne obstaja!');
    }

}); 

//@DELETE deleteMenu 
router.delete('/:id', (req, res, next)=>{
    if(req.params.id<poljeMenijev.length+1 && req.params.id>=1){
        poljeMenijev.splice(req.params.id-1, 1);
        res.send('Meni je izbrisan!');
    }else{
        //res.sendStatus(404);
        res.send('Meni ne obstaja!');
    }
});
*/

module.exports = router; 
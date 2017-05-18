module.exports = class Restavracija{
    constructor(id, naziv, naslov, mesto, vrednostObroka, vrednostDoplacila){
        this.id = id;
        this.naziv = naziv;
        this.naslov = naslov;
        this.mesto = mesto;
        this.vrednostObroka = vrednostObroka;
        this.vrednostDoplacila = vrednostDoplacila;
    }
}
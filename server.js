const { doesNotReject } = require("assert");
const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const PORT = 3000;
const fs = require("fs")
const path = require("path")
const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: 'baza.db',
    autoload: true
});
app.use(express.urlencoded({
    extended: true
}));
// const context = {

// }
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

app.get('/', function (req, res) {
    res.render('index.hbs');

})
app.get('/addCar', function (req, res) {
    res.render('add.hbs');

})
app.get('/delete', function (req, res) {
    res.render('delete.hbs');

})
app.get('/edit', function (req, res) {
    res.render('edit.hbs');

})
app.get('/list', function (req, res) {
    res.render('list.hbs');

})

app.post('/addCar', function (req, res) {
    console.log(req.body);
    const add = {
        ubezpieczony: req.body.ubezpieczony == "on" ? "TAK" : "NIE",
        benzyna: req.body.benzyna == "on" ? "TAK" : "NIE",
        uszkodzony: req.body.uszkodzony == "on" ? "TAK" : "NIE",
        naped: req.body.naped == "on" ? "TAK" : "NIE",
    }
    coll1.insert(add, function (err, newDoc) {
        console.log("new car with id = " + newDoc._id + "added to database")
        res.render("add.hbs", { id: newDoc._id, m: 999 })
    });

})

app.use(express.static('static'))
app.use(express.static('static/views'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

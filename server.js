const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');


app.get('/users', function(req,res){
  knex('users').then((result)=> {
      res.render('users', {result});
  })
  .catch((err)=> {
    console.log(err)
  });

});
app.get('/users/:id', function(req,res){
  knex('users').where('id', req.params.id).then((result)=>{
console.log(result);
    res.render('user', {result})
  })
});

app.get('/users/:id/edit', function(req,res){
  knex('users').where('id', req.params.id).then((result)=>{
    res.render('update', {result})
  });
});
//need to combine this with an onclick.


app.delete('/users/:id', function(req, res) {
  knex('users')
    .del()
    .where('id', req.params.id)
    .then((result) => {
      console.log(result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

app.listen(port, function() {
  console.log('Listening on', port);
});

const express = require('express');
const bcrypt = require('bcrypt');
const _= require('underscore');
const app = express();
const User = require('../models/user');

app.get('/usuario', function(req, res) {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

    User.find({estate:true}, 'nombre email role estate google img')
    .skip(desde)
    .limit(limite)
    .exec((err, users) => {
      if (err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.count({estate:true}, (err,conteo)=>{
        res.json({
          ok:true,
          users,
          conteo
        });

      });

    });



});

app.post('/usuario', function(req, res) {
  let body = req.body;

  let user = new User({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      });
    }

    // userDB.password = null; 

    res.json({
      ok: true,
      user: userDB
    });
  });

});

app.put('/usuario/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre','email', 'img', 'role', 'state' ]);

  User.findByIdAndUpdate(id, body, {new:true, runValidators: true}, (err,userDB) =>{

    if (err){
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      user: userDB
    });
  });

});

app.delete('/usuario/:id', function(req, res) {
  let id = req.params.id;
  let cambiaEstado = {
    estate:false
  };

  // User.findByIdAndRemove(id, (err, deleteUSer)=>{
  User.findByIdAndUpdate(id, cambiaEstado, {new:true}, (err, deleteUSer)=>{

    if (err || !deleteUSer){
      return res.status(400).json({
        ok: false,
        err: err || "User not found"
      });
    }

    res.json({
      ok:true,
      user: deleteUSer
    });
  });



});

module.exports = app;
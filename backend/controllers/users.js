'use strict'
let express = require('express')
let multer = require('multer')
let User = require('../models').User
let Sequelize = require('sequelize');
var bcrypt = require('bcryptjs')

let upload = multer()
let router = express.Router()

router.post('/user', upload.none(), function (req, res, next) {
  User.create(req.body, {fields: ['first_name', 'last_name', 'email', 'password']})
  .then(user => {
    // MISSING JWT TOKEN
    let ru = user.toJSON()
    delete ru.password
    ru.addresses = []
    res.json(ru);
  }).catch(next)
})


router.post('/login', upload.none(), function (req, res, next) {
  User.findOne({where: {email: req.body.email}}).then( user => {
    if(user){
      bcrypt.compare(req.body.password, user.password).then((correct) => {
        if(correct){
          // MISSING JWT TOKEN
          let ru = user.toJSON()
          delete ru.password
          res.json(ru);
        }else{
          let err = new Sequelize.ValidationError('El correo y la contraseña que has introducido no coinciden.')
          err.errors.push({path: 'login', message: 'El correo y la contraseña que has introducido no coinciden.'})
          next(err)
        }
      })
    }else{
      let err = new Sequelize.ValidationError('El correo y la contraseña que has introducido no coinciden.')
      err.errors.push({path: 'login', message: 'El correo y la contraseña que has introducido no coinciden.'})
      next(err)
    }
  }).catch(next)
})


router.get('/validate-user', function (req, res, next) {
  let user = User.build(req.query, {fields: [Object.keys(req.query)[0]]})
  user.validate({fields: [Object.keys(req.query)[0]]}).then((err) => {
    if(err){
      next(err)
    }else{
      res.sendStatus(200)
    }
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.put('/user/:id', upload.none(), function (req, res, next) {
  User.findById(req.params.id).then(user => {
    return user.update(req.body, {fields: ['first_name', 'last_name', 'telephone']})
  }).then((user) => {
    // MISSING JWT TOKEN
    let ru = user.toJSON()
    delete ru.password
    ru.addresses = []
    res.json(ru);
  }).catch(next)
})

module.exports = router
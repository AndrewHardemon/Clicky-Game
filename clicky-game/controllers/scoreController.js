const db = require("../models");

module.exports = {
  findAll: function(req, res){
    db.Score
      .find(req.query)
      .sort({ date: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res){
    db.Score
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findByName: function(req, res){
    db.Score
      .findOne({name: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res){
    db.Score
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  update: function(req, res){
    db.Score
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  // updateCollection: function(req, res){
  //   db.Score
  //     .update(req.query)
  //     .sort({ highscore: -1})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err))
  // },
  remove: function(req, res){
    db.Score
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }



}
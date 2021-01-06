const express = require('express')
const passport = require('passport')
const Character = require('../models/character')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST /characters
router.post('/characters', requireToken, (req, res, next) => {
  // extract the character from the body of the incoming request
  const charData = req.body.character
  // add user as character owner
  charData.owner = req.user._id
  // create a character using data we extracted earlier
  Character.create(charData)
    // respond with status code 201 created and the character
      .then(character => {
      res.status(201).json({ character: character.toObject() })
  })
    // if an error occurs, call the next middleware(handle404)
    .catch(next)
})

// INDEX
// GET /characters owned by the user
router.get('/characters', requireToken, (req, res, next) => {
  // search for characters using user ID
  Character.find({owner: req.user._id})
    // error handler
    .then(handle404)
    // respond with status code 200 and the character(s) found
    .then(character => res.status(201).json({ character: character }))
    // if an error occurs, call the next middleware(handle404)
    .catch(next)
})

// SHOW
// GET /characters/:id owned by user
router.get('/characters/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  // get a character using their ID
  Character.findOne({ _id: id, owner: req.user._id})
    //error handler
    .then(handle404)
    // respond with status code 200 and the character found
    .then(character => res.status(200).json({character: character}))
    // if an error occurs, call the next middleware(handle404)
    .catch(next)
})

// DESTROY
// DELETE /characters/:id owned by user
router.delete('/characters/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  // get a character using their ID that belongs to the user
  Character.findOne({ _id: id, owner: req.user._id})
    //error handler
    .then(handle404)
    // delete the single character
    .then(character => character.deleteOne())
    // respond with status code 204 so we know the character is destroyed
    .then(() => res.sendStatus(204))
    // if an error occurs, call the next middleware(handle404)
    .catch(next)
})

//UPDATE
// PATCH /characters/:id owned by user
router.patch('/characters/:id', requireToken, (req, res, next) => {
  delete req.body.character.owner
  const updatedData = req.body.character
  const id = req.params.id
  // get a character owned by the user via character ID
  Character.findOne({ _id: id, owner: req.user._id})
  // error handler
  .then(handle404)
  // update the character's data using the data being passed in
  .then(character => character.updateOne(updatedData))
  // respond with status code
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router

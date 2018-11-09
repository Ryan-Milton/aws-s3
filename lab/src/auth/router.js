'use strict';

import express from 'express';
const authRouter = express.Router();

import Player from './model.js';
import auth from './middleware.js';

// These routes should support a redirect instead of just spitting out the token ...
authRouter.post('/signup', (req, res, next) => {
  let player = new Player(req.body);
  player.save()
    .then( (player) => res.send(player.generateToken())).catch(next);
});


// I might have to invoke the auth function here
authRouter.post('/signin', auth, (req, res) => {
  res.cookie('Token', req.token);
  res.send(req.token);
});

export default authRouter;
const express = require('express');
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join, login, logout, idSearch, pwSearch, mylistview, list, islogin, deleteEV, updateEV, evaluater} = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

router.post('/idSearch', isNotLoggedIn, idSearch);

router.post('/pwSearch', isNotLoggedIn, pwSearch);

router.get('/mylistview', isLoggedIn, mylistview);

router.get('/list', isLoggedIn, list);

router.get('/islogin', isLoggedIn, islogin);

// router.post('/newevaluation', isLoggedIn, newevaluation);

router.post('/deleteEV', isLoggedIn, deleteEV);

router.post('/updateEV', isLoggedIn, updateEV);

router.get('/evaluater', isLoggedIn, evaluater);

module.exports = router;

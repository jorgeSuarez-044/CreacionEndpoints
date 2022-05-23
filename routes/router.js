const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router()

const authController = require('../controllers/authController');

//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/comments/create', authController.commentscreate )
router.delete('/comments/delete', authController.commentsdelete )
router.get('/logout', authController.logout)

module.exports = router
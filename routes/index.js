var express = require('express');
var router = express.Router();
const path=require('path');
const {index,register,processRegister,login,processLogin,perfil}=require(path.join('..','controllers','indexController'));

/* middlewares */
const upload=require(path.join('..','middlewares','userMulter'));

router.get('/',index);
router.get('/register',register);
router.post('/register',upload.any(),processRegister);
router.get('/login',login);
router.post('/login',processLogin);
router.get('/profile/:id',perfil)
module.exports = router;

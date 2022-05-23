const jwt = require('jsonwebtoken')
const conexion = require('../database/db')
const {promisify} = require('util')
const { v4: uuidv4 } = require('uuid');
 

//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
   
        //console.log(passHash)   
        conexion.query('INSERT INTO users SET ?', {user:user, name: name, pass:pass}, (error, results)=>{
            if(error){console.log(error)}
            res.status(200).send( 'El usuario ha sido registrado correctamente');
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('error register')
    }       
}


exports.commentscreate = async (req, res)=>{    
    try {
        const subject = req.body.subject
        const website = req.body.website
        const text = req.body.text
        const email = req.body.email
        const id = uuidv4();



        //console.log(passHash)   
        conexion.query('INSERT INTO comment SET ?', {subject:subject, website: website, text:text, email: email, id:id}, (error, results)=>{
            if(error){console.log(error)}
            res.status(200).send({status: 'OK' , id:id});
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('error register')
    }       
}

exports.commentsdelete = async (req, res)=>{    
    try {
       
        const id = req.body.id;



        //console.log(passHash)   
        conexion.query('DELETE FROM comment WHERE id = ?', [id], (error, results)=>{
            if(error){console.log(error)}
            res.status(200).send({status: 'Deleted' , id:id});
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('error register')
    }       
}

exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            res.send('valide que los campos esten llenos');
        }else{
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results)=>{
                if( results.length === 0 || !(pass, results[0].pass) ){
                    res.send('usuario o contraseña incorrecta')
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+user)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                 
                   res.cookie('jwt', token, cookiesOptions)
                   res.send({status:'OK' ,user:{token: token}})
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}
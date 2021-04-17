
const bcrypt=require('bcrypt');
const path=require('path');
const {getUsers, setUsers} = require(path.join('..','data','users'));
const users=getUsers();
module.exports={
    index:(req,res)=>{
        res.render('index',{
            title:"Inicio"
        });
    },
    register:(req,res)=>{
        res.render('register',{
            title:"Registro"
        });
    },
    processRegister:(req,res)=>{
        const {nombre,apellido,email,pass1}=req.body;
        let lastID=0;
        users.forEach(user => {
            if(user.id>lastID){
                lastID=user.id
            }
        });
        let hashPass=bcrypt.hashSync(pass1,12);
        let newUser={
            id:+lastID+1,
            nombre,
            apellido,
            email,
            pass:hashPass,
            avatar:req.files[0].filename
        }
        users.push(newUser);
        setUsers(users)
        return res.redirect('/')
    },
    login:(req,res)=>{
        res.render('login',{
            title:"Login"
        })
    },
    processLogin:(req,res)=>{
        const{email,contraseña}=req.body;
        let result=users.find(user=>user.email==email);
        if(result){
            if(bcrypt.compareSync(contraseña.trim(),result.pass)){
                /* res.send(result) */
                return res.redirect(`profile/${result.id}`)
            }
        }
        
    },
    perfil:(req,res)=>{
        let result=users.find(user=>user.id==req.params.id)
       res.render('profile',{
           title:"Tu perfil",
           result
       })
   }
}
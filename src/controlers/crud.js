const express = require("express");
const { redirect } = require("express/lib/response");
const conexion = require("../conexion")  
var usuario = ""
var admin = false
var lista=""
exports.getInicio = (req,res)=>{
    if(usuario != ""){
        if(!admin){
        conexion.query("select id,nombre from lista where usuario = '"+usuario+"'",function(error,results1,fields){
        if(error){
            throw error
        }
        else{
            conexion.query("select idlista,nombre,precioreal,precioestimado from producto where nombreu = '"+usuario+"'",function(error,results2,fields){
                if(error){
                    throw error
                }
                else{
                    var datos = []
                    results1.forEach(function(element) {
                        var dato =[]
                        results2.forEach(function(elemento) {
                            if(element.id == elemento.idlista){
                                dato.push(elemento)
                            }
                          });
                        datos.push({nombre:element.nombre,id:element.id,productos:dato})
                      });
                    console.log(datos);
                    res.render("inicio.html",{listas:datos});
                }
            })
        }
        })
    }
    else{
        res.redirect("/admin")
    }
    }
    else{
        res.redirect("/")
    }
}

exports.getLogin=(req,res)=>{
    res.render("login.html");
}

exports.postLogin =(req,res)=>{
    const username =req.body.username;
    const contraseña =req.body.contraseña;
    conexion.query("select * from usuario where nombre = '"+username+"' and contraseña = '"+contraseña+"'",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            if(results.length == 0){
                console.log("usuario no registrado, intente de nuevo o registrese");
                res.render("login.html");
            }
            else{
                usuario=username;
                console.log("sesion iniciada correctamente "+usuario)
                    console.log(results)
                if(results[0].rol == "admin"){
                    admin = true
                    res.redirect("/admin")
                }
                else{
                 res.redirect("/inicio")

                }
            }
        }
    })
}

exports.getRegistrarse = (req,res)=>{
    res.render("registrarse.html");
}

exports.postRegistrarse = (req,res)=>{
    const username =req.body.username;
    const contraseña =req.body.contraseña;
    conexion.query("select * from usuario where nombre = '"+username+"'",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            if(results.length == 0){
                conexion.query("insert into usuario (nombre,contraseña,rol) values('"+username+"','"+contraseña+"','usuario')",function(error,results,fields){
                    if(error){
                        throw error
                        }
                    else{
                        console.log("registrado correctamente")
                    }});
                res.render("login.html");
            }
            else{
                
                res.render("registrarse.html");
            }
        }
    })
}

exports.getLista=(req,res)=>{
    if(usuario != ""){
        if(!admin){
    conexion.query("select * from producto where idlista = '"+req.params.id+"'",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log(results);
            conexion.query("select * from lista where id = '"+req.params.id+"'",function(error,result,fields){
                if(error){
                    throw error
            }
            else{
                res.render("lista.html",{productos:results,id:req.params.id,nombre:result[0].nombre});
            }})
        }
    })
    }
    else{
        res.redirect("/admin")
    }
    }
    else{
        res.redirect("/")
    }
}

exports.getAdmin = (req,res)=>{
    if(usuario !=""){
    conexion.query("select * from lugar where activo = 0",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            res.render("admin.html",{tiendas:results});
        }
    });
    
    }
    else{
        res.redirect("/")
    }
}

exports.getCrearLista =(req,res)=>{
    if(usuario !=""){
        if(!admin){
        res.render("crearLista.html");
    }
    else{
        res.redirect("/admin")
    }
    }
    else{
        res.redirect("/")
    }
}

exports.postCrearLista = (req,res)=>{
    const nombre =req.body.nombre;
    conexion.query("insert into lista (nombre,usuario) values('"+nombre+"','"+usuario+"')",function(error,results,fields){
        if(error){
            res.redirect("/crearLista");
            throw error
        }
        else{
            console.log("lista "+nombre+" registrada");
            res.redirect("/inicio")
        }
    })
}

exports.getActualizarLista = (req,res)=>{
    if(usuario != ""){
        if(!admin){
        conexion.query("select * from lugar where activo = 1",function(error,results,fields){
            if(error){
                throw error
            }
            else{
                res.render("actualizarLista.html",{id:req.params.id,lugares:results});
            }
        });
    }
    else{
        res.redirect("/admin")
    }
    }
    else{
        res.redirect("/")
    }
}

exports.getInsertarLugar = (req,res)=>{
    if(usuario != ""){
        if(!admin){ 
    res.render("insertarLugar.html");
        }
        else{
            res.redirect("/admin")
        }
    }
    else{
        res.redirect("/")
    }
}

exports.postActualizarLista = (req,res)=>{
    const nombre = req.body.nombre;
    const tienda = req.body.tienda;
    const costop = req.body.costop;
    const costor = req.body.costor;
    const descripcion = req.body.descripcion;
    const idlista = req.params.id
    conexion.query("insert into producto (nombreu,idlista,idlugar,nombre,precioreal,precioestimado,descripcion) values('"+usuario+"',"+idlista+","+tienda+",'"+nombre+"',"+costor+","+costop+",'"+descripcion+"')",function(error,results,fields){
        if(error){
            res.redirect("/actualizarLista"+idlista);
            throw error
        }
        else{
            res.redirect("/listas/"+idlista);
            console.log("producto "+nombre+" registrado");
        }
    })
    
}

exports.postInsertarLugar = (req,res)=>{
    const nombret = req.body.nombret;
    const nombres = req.body.nombres;
    const direccion = req.body.direccion;
    const ciudad = req.body.ciudad;
    const region = req.body.region;
    
    conexion.query("select * from lugar where nombre = '"+nombret+"' and nombresucursal = '"+nombres+"' and ciudad = '"+ciudad+"' and direccion = '"+direccion+"' and region = '"+region+"'",function(error,results,field){
        if(error){
            throw error
        }
        else{
            if(results.length != 0){
                console.log("tienda registrada anteriormente");
                res.redirect("/insertarLugar");
            }
            else{
                conexion.query("insert into lugar (nombre,nombresucursal,ciudad,direccion,region) values('"+nombret+"','"+nombres+"','"+ciudad+"','"+direccion+"','"+region+"')",function(error,results,fields){
                    if(error){
                        res.redirect("/insertarLugar");
                        throw error
                    }
                    else{
                        console.log("tienda "+nombret+" registrada");
                        res.redirect("/inicio");
                    }
                })
            }
        }
    })

}

exports.getAdminsId = (req,res)=>{ 
    var identificador = req.params.id;
    conexion.query("delete from lugar where id = '"+identificador+"' and activo ="+0,function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log("lugar eliminado correctamente")
            res.redirect("/admin")
        }
    })
}

exports.postAdminsId = (req,res)=>{ 
    var identificador = req.params.id;
    conexion.query("update lugar set activo=1 where id = '"+identificador+"' and activo ="+0,function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log("lugar activado correctamente")
            res.redirect("/admin")
        }
    })
}

exports.getListaId = (req,res)=>{ 
    var identificador = req.params.id;
    conexion.query("delete from producto where id = '"+identificador+"'",function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log("producto eliminado correctamente")
            res.redirect("/listas/"+req.params.idlista);
        }
    })
}

exports.postAdminM = (req,res)=>{ 
    var identificador = req.params.id;
    conexion.query("update producto set activo=1 where id = "+identificador,function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log("producto marcado")
            res.redirect("/listas/"+req.params.idlista);
        }
    })
}

exports.postAdminD=(req,res)=>{ 
    var identificador = req.params.id;
    conexion.query("update producto set activo=0 where id = "+identificador,function(error,results,fields){
        if(error){
            throw error
        }
        else{
            console.log("producto desmarcado")
            res.redirect("/listas/"+req.params.idlista);
        }
    })
}

exports.logout = (req,res)=>{
    usuario = ""
    admin = false
    res.redirect("/")
}

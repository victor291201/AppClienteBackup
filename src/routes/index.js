const express = require("express");
const router = express.Router();  
var conexion = require("../conexion")  
const crud = require("../controlers/crud")

router.get("/",crud.getLogin);

router.post("/",crud.postLogin);

router.get("/registrarse",crud.getRegistrarse);

router.post("/registrarse",crud.postRegistrarse);

router.get("/inicio",crud.getInicio);

router.get("/listas/:id",crud.getLista);

router.get("/admin",crud.getAdmin);

router.get("/crearLista",crud.getCrearLista);

router.get("/actualizarLista/:id",crud.getActualizarLista);

router.get("/insertarLugar",crud.getInsertarLugar);

router.post("/crearLista",crud.postCrearLista);

router.post("/actualizarLista/:id",crud.postActualizarLista);

router.post("/insertarLugar",crud.postInsertarLugar);

router.get("/admins/:id",crud.getAdminsId);

router.post("/admins/:id",crud.postAdminsId);

router.get("/deleteList/:idlista/:id",crud.getListaId);

router.post("/adminM/:idlista/:id",crud.postAdminM);

router.post("/adminD/:idlista/:id",crud.postAdminD);

router.get("/logout",crud.logout);
module.exports = router;
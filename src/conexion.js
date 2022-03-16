const express = require("express");
const app = express();

var mysql = require("mysql");
const Connection = require("mysql/lib/Connection");

var conexion = mysql.createConnection({
    host:"localhost",
    database:"listas",
    user:"root",
    password:"291201"
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("bd is conected")
    }
});

module.exports = conexion;
const server = require('../../config/server');
const express = require('express');
const router = express.Router();
server.use('/api/cadastros/membros', router);
const general = require('../core/general.js');

router.route('/listarmembros').get(function(req, res) {
    var sql = "SELECT * FROM membros";
    general.select(sql, function(ret){
        res.send(ret);
    })    
})

router.route('/gravar').post(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    
    var atable = req.baseUrl.split("/");
    var table = "";
    if(atable.length > 0){
        table = atable[atable.length - 1]
    }
    var parametros = req.body;
    general.executeObj(table,parametros, function(ret){
        res.send(ret);
    })
      
})

router.route('/delete/:id').get(function(req, res) {
    var id = req.param('id');
    var atable = req.baseUrl.split("/");
    var table = "";
    if(atable.length > 0){
        table = atable[atable.length - 1]
    }

    var sql = "DELETE FROM " + table + " WHERE id=" + id;
    general.execute(sql, function(ret){
        res.send(ret);
    })    
})


router.route('/listsearch').get(function(req, res) {
    var sql = "SELECT id AS id, nm_nome AS Nome, nm_rg AS RG, nm_cpf AS CPF, nm_email AS Email, ";
    sql += " nm_telefone AS Telefone";
    sql += " FROM membros ORDER BY nm_nome";
    general.select(sql, function(ret){
        res.send(ret);
    })    
})

router.route('/search/:id').get(function(req, res) {
    var id = req.param('id');
    var sql = "SELECT * ";
    sql += " FROM membros WHERE id=" + id;
    general.select(sql, function(ret){
        res.send(ret);
    })    
})
//==========================================================================

router.route('/testeinsert').get(function(req, res) {
    var sql = "INSERT INTO membros (nm_nome) VALUES('Vieira')";
    general.execute(sql, function(ret){
        res.send(ret);
    })    
})

router.route('/testedelete').get(function(req, res) {
    var sql = "DELETE FROM membros WHERE nm_nome='Vieira'";
    general.execute(sql, function(ret){
        res.send(ret);
    })    
})

router.route('/testeupdate').get(function(req, res) {
    var sql = "UPDATE membros SET nm_nome='PPERRETTO' WHERE nm_nome='Vieira'";
    general.execute(sql, function(ret){
        res.send(ret);
    })    
})
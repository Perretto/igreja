var sqlite3 = require('sqlite3').verbose();

exports.select =  function (sql, callback){
    var retorno = [];
    //var db = new sqlite3.Database('C:\\sqlite\\baseig');
    var db = new sqlite3.Database('baseig');
    
    db.serialize(function() {
        db.each(sql, function(err, row) {
            retorno.push(row);            
        });        
    });
    
    db.close((err) => {
        if (err) {
          console.error(err.message);
          retorno.push(err);
        } 
        
        callback(retorno);         
    });
}

exports.execute =  function (sql, callback){
    var retorno = [];
    //var db = new sqlite3.Database('C:\\sqlite\\baseig');
    var db = new sqlite3.Database('baseig');
    
    db.serialize(function() {        
        db.run(sql);        
    });
    
    db.close((err) => {
        if (err) {
          console.error(err.message);
          retorno.push(err.message);
        } 
        
        callback(retorno);         
    });
}






exports.executeObj =  function (table, parametros, callback){
    var sql = "";
    var columns = "";
    var values = "";
    var nome = "";
    var i = 0;
    var up = false;

    if(parametros.id){
        up = true;
        sql = "UPDATE " + table + " SET ";
        for (index in parametros) {
            if(index != "id"){
                nome = "";

                switch (index.substring(0,2)) {
                    case "nm":
                        nome = "'" + parametros[index] + "'";
                        break; 
                    case "dt":
                        nome = "'" + parametros[index] + "'";
                        break;            
                    default:
                        nome = "" + parametros[index] + "";
                        break;
                }
                
                if(i == 0){
                    sql += " " + index + "=" + nome;
                }else{
                    sql += ", " + index + "=" + nome;
                }
                i += 1; 
            }
        }

        sql += " WHERE id=" + parametros.id + "";         
    }else{
        for (index in parametros) {
            if(index != "id"){
                console.log(index.substring(0,2))
                switch (index.substring(0,2)) {
                    case "nm":
                        nome = "'" + parametros[index] + "'";
                        break; 
                    case "dt":
                        nome =  "'" + parametros[index] + "'";
                        break;            
                    default:
                        nome = "" + parametros[index] + "";
                        break;
                }


                if(i == 0){
                    columns += index;
                    values += nome;
                }else{
                    columns += ", " + index;
                    values += ", " + nome;
                }
                
                i += 1;
            }
        }
        sql = "INSERT INTO " + table + " (" + columns + ") VALUES(" + values + ")";
    }
    console.log(sql)
    var retorno = [];
    //var db = new sqlite3.Database('C:\\sqlite\\baseig');
    var db = new sqlite3.Database('baseig');
    
    db.serialize(function() {        
        db.run(sql,function(err, ret){
            if(up){
                this.lastID = parametros.id;
            }
            retorno.push(this);
            console.log(this)    
        });    
    });
    
    db.close((err) => {
        if (err) {
          console.error(err);
          retorno.push(err);
        } 
        
        callback(retorno);         
    }); 
}
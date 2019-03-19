function logar(){
    var login = $("#login").val();
    var senha = $("#senha").val();

    if(!login && !senha){
        iziToast.error({
            title: '',
            message: 'Digite um login e senha validos!',
        });
        return;
    }

    var url = "http://" + window.location.host + ":3005/api/administrador/login/" + login + "/" + senha
                 
    $.ajax({        
        type: "GET",
        url: url,
        success: function(data){
            if(data){
                if(data.length > 0){
                    if(data[0]){
                        localStorage.setItem("username", data[0].nm_nome);
                        localStorage.setItem("userid", data[0].id);
                        localStorage.setItem("admin", data[0].sn_administrador);
                        localStorage.setItem("secr", data[0].sn_secretaria);
                        localStorage.setItem("tesou", data[0].sn_tesouraria);
                        window.location.href = "http://" + window.location.host;
                    }else{
                        iziToast.error({
                            title: '',
                            message: 'Login ou senha não localizado!',
                        }); 
                    }  
                }else{
                    iziToast.error({
                        title: '',
                        message: 'Login ou senha não localizado!',
                    }); 
                }
            }                        
        }
    
    });
}

function getuser(){
    $("#usertopo").html("Olá, " + localStorage.getItem("username"));
    $("#nomemenu").html(localStorage.getItem("username"));

    var admin = localStorage.getItem("admin");
    var secr = localStorage.getItem("secr");
    var tesou = localStorage.getItem("tesou");

    if(admin == 1){
        $("#tipousuario").html("Administrador");
    }else if(secr == 1){
        $("#tipousuario").html("Secretaria");
    }else if(tesou == 1){
        $("#tipousuario").html("Tesouraria");
    }

    dashtempo()
}

function dashtempo(){
    var url = "http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=dd434d021720bdc3dfeeac716c945194";
            
    $.ajax({        
        type: "GET",
        url: url,
        dataType: "json",
        crossDomain:true,
        success: function(data){
            if(data){
                console.log(data)
                $("#temperaturamin").prepend(data.data[0].temperature.min)
                $("#temperaturamax").prepend(data.data[0].temperature.max)

                $("#weather-location").html(data.name + ", " + data.state)
            }                        
        }
    
    });


    var data = new Date();
    var dias = new Array(
    'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'
    );

    $("#diasemana").html(dias[data.getDay()]);

    var arrayMes = new Array(12);
arrayMes[0] = "Janeiro";
arrayMes[1] = "Fevereiro";
arrayMes[2] = "Março";
arrayMes[3] = "Abril";
arrayMes[4] = "Maio";
arrayMes[5] = "Junho";
arrayMes[6] = "Julho";
arrayMes[7] = "Agosto";
arrayMes[8] = "Setembro";
arrayMes[9] = "Outubro";
arrayMes[10] = "Novembro";
arrayMes[11] = "Dezembro";

$("#weather-date").html(data.getDate() + " " + arrayMes[data.getMonth()] + ", " + data.getFullYear())


var admin = localStorage.getItem("admin");
var secr = localStorage.getItem("secr");
var tesou = localStorage.getItem("tesou");

    if(secr){
        $.ajax({
            url: "../../../dashsecretaria.html",
            context: document.body
        }).done(function(data) {
            $("#dash").html(data);
        });
        
    }else if(tesou){
        $.ajax({
            url: "../../../dashtesouraria.html",
            context: document.body
        }).done(function(data) {
            $("#dash").html(data);
        });
        
    }

}






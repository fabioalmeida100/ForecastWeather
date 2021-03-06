function dataAtualFormatada() {
	    var data = new Date();
        var dia  = data.getDate().toString();
        var diaF = (dia.length == 1) ? '0' + dia : dia;
        var mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth() Janeiro começa com zero.
        var mesF = (mes.length == 1) ? '0' + mes : mes;
        var anoF = data.getFullYear();
        var hora = data.getHours();
        var minuto = data.getMinutes();
        if (parseInt(hora) < 10)
            hora = '0' + hora;

        if (parseInt(minuto) < 10)
            minuto = '0' + minuto;

	return diaF + "/" + mesF + "/" + anoF + " às " + hora + ":" + minuto;
}

$(document).ready(function() {
    document.getElementById('hora').innerHTML = dataAtualFormatada();

    var urlRequest = 
        "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/6015/current?token=3b078bb9aa643f40996c162055ef7f92";
    
	var queryURL = "https://cors-anywhere.herokuapp.com/" + urlRequest;
    
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
	    headers: {
			"x-requested-with": "xhr" 
		  },
        url: queryURL,
        success: function(result){
            $('#loading').hide();
            $("#temperature").html(`Temperatura: ${result.data.temperature} C`);
            $("#wind_direction").html(`Dir. do vento: ${result.data.wind_direction}`);
            $("#wind_velocity").html(`Vento: ${result.data.wind_velocity} Km/h`);
            $("#humidity").html(`Humidade: ${result.data.humidity} %`);
            $("#condition").html(`Condição: ${result.data.condition}`);
    }});
});

// Verificador de placas 
function predictorJSON(licensePlateNumber,date,hour,minute){
	
	// Obtener datos del html
	var dateClient =date;
	var hourTimeClient = hour;
	var minuteTimeClient = minute;
	var licensePlateNumberClient = licensePlateNumber;
				
	// Crear parametros de pico y placa segun dias y numeros		
	var data = '{"starttime": "07:00:00,09:30:00","endtime": "16:00:00,19:30:00","monday": "1,2","tuesday": "3,4","wednesday": "5,6","thursday": "7,8","friday": "9,0"}';
				
	var items = JSON.parse(data);
	
	var starTimeValue = items.starttime;
	var endTimeValue = items.endtime;
	var mondayValue = items.monday;
	var tuesdayValue = items.tuesday;
	var wednesdayValue = items.wednesday;
	var thursdayValue = items.thursday;
	var fridayValue = items.friday;				
	
	// Tiempo de usuario
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth()+1; 
	var day = nowDate.getDate();
	var hour = Number(hourTimeClient);
	var minute  = Number(minuteTimeClient);
	var second  = 0;
			
	// Tiempo de usuario dividido
	var rangeStarTimeValue = starTimeValue.split(',');
	var rangeEndTimeValue = endTimeValue.split(',');
			
	// Capturar tiempo inicial
	var range1StarTimeSplit  = rangeStarTimeValue[0].split(':');
	var range1StartTime = new Date(year, month, day, parseInt(range1StarTimeSplit[0]),parseInt(range1StarTimeSplit[1]), parseInt(range1StarTimeSplit[2]), 0);
			
	var range2StarTimeSplit  = rangeStarTimeValue[1].split(':');
	var range2StartTime = new Date(year, month, day, parseInt(range2StarTimeSplit[0]),parseInt(range2StarTimeSplit[1]), parseInt(range2StarTimeSplit[2]), 0);
						
	// Obtener el tiempo final de usuario
	var range1EndTimeSplit  = rangeEndTimeValue[0].split(':');
	var range1EndTime = new Date(year, month, day, parseInt(range1EndTimeSplit[0]),parseInt(range1EndTimeSplit[1]), parseInt(range1EndTimeSplit[2]),0);
			
	var range2EndTimeSplit  = rangeEndTimeValue[1].split(':');
	var range2EndTime = new Date(year, month, day, parseInt(range2EndTimeSplit[0]),parseInt(range2EndTimeSplit[1]), parseInt(range2EndTimeSplit[2]),0);
			
	// Tiempo introducido de usuario
	var timeClient = new Date(year, month, day, hour,minute, second, 0);
	var timeError = 0;
	var hourNumber = "";
	var minuteNumber = "";
		
	// Comparar tiempo de cliente con tiempo de parametros pico y placa
	if ( (timeClient >= range1StartTime && timeClient <= range2StartTime)|| (timeClient >= range1EndTime && timeClient <= range2EndTime)) {		    	
		if(hourTimeClient < 10)
			hourNumber="0"+hourTimeClient;
		else
			hourNumber= hourTimeClient;
		if(minuteTimeClient < 10)
			minuteNumber="0"+minuteTimeClient;
		else
			minuteNumber=minuteTimeClient;		
		timeError = 1;			    
	}
			
	// Obtencion del ultimo numero de placa de auto 
	var validationNumber = licensePlateNumberClient.substring(licensePlateNumberClient.length-1,licensePlateNumberClient.length);
	var validationError = 0;
	var firstNumber = 0;
	var secondNumber = 0;			
					
	// Comparacion de ultimo digito con dias de pico y placa				
	if(dateClient =="Monday"){
		var mondayNumbers = mondayValue.split(',');
		firstNumber = Number(mondayNumbers[0]);
		secondNumber = Number(mondayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Tuesday"){
		var tuesdayNumbers = tuesdayValue.split(',');
		firstNumber = Number(tuesdayNumbers[0]);
		secondNumber = Number(tuesdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Wednesday"){
		var wednesdayNumbers = wednesdayValue.split(',');
		firstNumber = Number(wednesdayNumbers[0]);
		secondNumber = Number(wednesdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Thursday"){
		var thursdayNumbers = thursdayValue.split(',');
		firstNumber = Number(thursdayNumbers[0]);
		secondNumber = Number(thursdayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	if(dateClient =="Friday"){
		var fridayNumbers = fridayValue.split(',');
		firstNumber = Number(fridayNumbers[0]);
		secondNumber = Number(fridayNumbers[1]);
		if(validationNumber == firstNumber || validationNumber == secondNumber)
			validationError=1; // Error
	}
	var result ="";
	// Resultados segun comparacion arrojara el dia si puede o no salir el auto
	if((timeError == 0 && validationError ==1)||(timeError ==1 && validationError == 0) || (timeError == 0 && validationError == 0))
		result="Su auto puede salir sin ninguna restriccion";
	if(timeError == 1 && validationError ==1)		
		result="Usted no puede salir su auto termina en:  "+validationNumber+"  y el horario de:  "+hourNumber+":"+minuteNumber+"   esta fuera del rango permitido";
	
	return result;
	
}

function loadData(){
	
	$("#hour_time_value").html('');
	$("#minute_time_value").html('');
	$("#day_date_value").html('');
	
	$("#hour_time_value").append('<option value="">Seleccione</option>');
	$("#minute_time_value").append('<option value="">Seleccione</option>');	
	$("#day_date_value").append('<option value="">Seleccione</option>');
	
	for(var i =0;i<24;i++){				
		if(i<10)
			$("#hour_time_value").append('<option value="'+i+'"> 0'+i+'</option>');
		else
			$("#hour_time_value").append('<option value="'+i+'"> '+i+'</option>');
	}
	for(var j =0;j<60;j++){
		if(j<10)
			$("#minute_time_value").append('<option value="'+j+'"> 0'+j+'</option>');
		else
			$("#minute_time_value").append('<option value="'+j+'"> '+j+'</option>');
	}

	$("#day_date_value").append('<option value="Monday">Lunes</option>');
	$("#day_date_value").append('<option value="Tuesday">Martes</option>');
	$("#day_date_value").append('<option value="Wednesday">Miercoles</option>');
	$("#day_date_value").append('<option value="Thursday">Jueves</option>');
	$("#day_date_value").append('<option value="Friday">Viernes</option>');
	
	
}
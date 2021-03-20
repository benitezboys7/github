var Vehi = function(licensePlateNumber){


    this.vehiLicensePlateNumber= licensePlateNumber;

    this.predictorPicoYPlaca= function(date,hour,minute){
        return predictorJSON(this.vehiLicensePlateNumber,date,hour,minute);
    };

};


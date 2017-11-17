'use strict'

var url = 'http://localhost:8080/search';

const methods = function ( methodType, filtering, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open( methodType, url + filtering );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log({ "resp":xhr.responseText});
            callback(JSON.parse(xhr.responseText));
        };
    };

    xhr.send();
    console.log("request sent")
};


// const getWithVariable = (id, callback) => { 
//     methods('GET', '' + id, callback);
// }

const getDatas = callback => {
    methods('GET', '', callback);
}

const renderCars = function(carsData) {
    var table = document.querySelector('table');

    carsData.forEach( car => {
        let oneCarRow =  document.createElement('tr');
            oneCarRow.innerHTML = '<td>'+ car.plate + '</td><td>' + car.brand + '</td><td>' + car.car_model + '</td><td>' + car.color + '</td><td>' + car.year + '</td>';
            table.appendChild(oneCarRow);
    });
    
}



// const sendDatas = function(postData) {
//     methods('POST', '', pass, postData)
// }

var data = getDatas(renderCars);
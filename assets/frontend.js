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
    var neededDatas = carsData.data;
    var table = document.querySelector('table');

    neededDatas.forEach( car => {
        let oneCarRow =  document.createElement('tr');
            oneCarRow.innerHTML = '<td>'+ car.plate + '</td><td><button value=' + car.car_brand + ' class=\'cars_brand\'>' + car.car_brand + '</button></td><td>' + car.car_model + '</td><td>' + car.color + '</td><td>' + car.year + '</td>';
            table.appendChild(oneCarRow);
    });

    var htmlBrandButtons = document.querySelectorAll('.cars_brand');
    var buttons = Array.from(htmlBrandButtons);
    var filteringBrand = '';
        buttons.forEach(function(element){
            element.addEventListener("click", function(){
                filteringBrand =  element.value;
                getBrandData(element.value);
                table.innerHTML='';
            });   
        });
    }
    
const getBrandData = function(value, callback) {
    methods('GET', '/' + value, callback); 
}

// const sendDatas = function(postData) {
//     methods('POST', '', pass, postData)
// }

var data = getDatas(renderCars);
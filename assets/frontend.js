'use strict'

var url = 'http://localhost:8080/';

var SubmitButton = document.querySelector('#submit');    
SubmitButton.addEventListener("click", submitClick);

const methods = function ( methodType, filtering, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open( methodType, url + filtering );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log({ 'resp':xhr.responseText});
            callback(JSON.parse(xhr.responseText));
        };
    };
    
    xhr.send();
    console.log('request sent')
};

    
const renderCars = function(carsData) {
    var neededDatas = carsData.data;
    var table = document.querySelector('table');
        table.innerHTML='';   
    neededDatas.forEach( car => {
        let oneCarRow =  document.createElement('tr');
        oneCarRow.innerHTML = '<td>'+ car.plate + '</td><td><button value=' + car.car_brand + ' class=\'cars_brand\'>' + car.car_brand + '</button></td><td>' + car.car_model + '</td><td>' + car.color + '</td><td>' + car.year + '</td>';
        table.appendChild(oneCarRow);
    });
        
    var htmlBrandButtons = document.querySelectorAll('.cars_brand');
    var buttons = Array.from(htmlBrandButtons);
    var filteringBrand = '';
    buttons.forEach(function(element){
        element.addEventListener('click', function(){
            filteringBrand =  element.value;
            getBrandData(element.value);
            table.innerHTML='';
        });   
    });
}

function submitClick() {
    var plateNo = document.querySelector('input').value;
    if (plateNo !== "") {
        getPlateNo(plateNo, renderCars);
    }
}
    
const getDatas = callback => {
    methods('GET', 'search', callback);
}

const getBrandData = function(value, callback) {
    methods('GET', 'search/' + value, callback); 
}

const getPlateNo = (plateNo, callback) => { 
    methods('GET', 'search?plate=' + plateNo, callback);
}

var data = getDatas(renderCars);
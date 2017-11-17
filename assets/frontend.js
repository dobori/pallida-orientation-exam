'use strict'

var url = 'http://localhost:8080/';

const methods = function ( methodType, filtering, callback, reqBody ) {
    const xhr = new XMLHttpRequest();
    xhr.open( methodType, url + filtering );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log({ "resp":xhr.responseText});
            callback(JSON.parse(xhr.responseText));
        };
    };

    let postData = null;
    if (reqBody) {
        postData = JSON.stringify(reqBody);    
    };

    xhr.send(postData);
    console.log("request sent")
};

const getWithVariable = (id, callback) => { 
    methods('GET', '' + id, callback);
}

const getDatas = callback => {
    methods('GET', '', callback);
}

const sendDatas = function(postData) {
    methods('POST', '', pass, postData)
}
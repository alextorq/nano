function makeRequest(date, url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("POST", url, true);
        let json = JSON.stringify(date);
        request.onreadystatechange = function() { // (3)
            if (request.readyState != 4) return;
            if (request.status != 200) {
                reject(request.status);
            }
            else {
                console.clear();
                resolve(this.responseText);
            }
        };
        request.send(json);
    })
}
global.makeRequest = makeRequest;
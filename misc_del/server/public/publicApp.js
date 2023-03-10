var x = document.getElementById("locationCoords");

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerText = `Latitude: ${Math.round(position.coords.latitude * 1000) / 1000} Longitute: ${Math.round(position.coords.longitude * 1000) / 1000}`;
}

console.log("InBody");

prevVal = 0;
function postValue() {
    let currVal = document.getElementById("inputValID").value;
    if (prevVal != currVal) {
        prevVal = currVal;
        let data = { value: currVal};
    
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('/getInfo', options)
            .catch((error) => {
                console.error('Error:', error);
            });
    }  
}

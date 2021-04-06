//make the call to the directions API here
//set the returnedGeometry var to the returned Geo

var geo = {}

function setGeometry(newGeometry) {
    geo = newGeometry
}

var ReturnedGeometry = function() {
    return geo
}
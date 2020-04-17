let myMap;

// hardcoded values
let startPosition = { lat: 20.675377, lng: -103.340121 };
let routeCoordinates = [
	{ lat: 20.665377, lng: -103.330121 },
	{ lat: 20.705377, lng: -103.350121 },
	{ lat: 20.695377, lng: -103.460121 },
	{ lat: 20.505377, lng: -103.370121 }
];

function initMap() {
	var mapProp = {
		center: startPosition,
		zoom: 12
	};
	myMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);

	placeMarker(startPosition, myMap);

	// chack if map was initialized
	if (myMap) {
		// add functions that places a marker on clicked point in map
		myMap.addListener('click', (e) => {
			placeMarker(e.latLng, myMap);
		});

		// markerArray = [];
		// for(coord of routeCoordinates) {
		// 	markerArray.push(placeMarker(coord, myMap));
		// }
		// drawPolyline(markerArray, myMap);
		drawPolyline(routeCoordinates, myMap);
	}

}

// returns the new marker but it must be handled wherever this function is called
function placeMarker(latLng, map) {
	return new google.maps.Marker({position: latLng, map: map});
}


// function accepts array of coordinates or array of markers
function drawPolyline(points = [], map) {
	let pathPoints;
	if (points[0].getPosition) {
		pathPoints = points.map(point => {
			console.log(point.getPosition());
			return point.getPosition();
		});
	}
	else {
		pathPoints = points;
	}
	var path = new google.maps.Polyline({
		path: pathPoints,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	path.setMap(map);
	return path;
}





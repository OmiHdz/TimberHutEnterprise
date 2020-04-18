var idUser = localStorage.getItem('id');
let myMap;
let firstMarkerIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
// hardcoded values
let startPosition = { lat: 20.675377, lng: -103.340121 };

const submitButton = document.getElementById("submitRoute");

function initMap() {

    var mapProp = {
        center: startPosition,
        disableDoubleClickZoom: true,
		zoom: 12
	};
	myMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    
    let markersArray = [];
    let myPolyline;
	// chack if map was initialized
	if (myMap) {
		// add functions that places a marker on clicked point in map
		myMap.addListener('dblclick', (e) => {
            // create, prepare, and push marker into array
            let myMarker = placeMarker(e.latLng, myMap);
            myMarker.setDraggable(true);
            myMarker.addListener('click', () => {
                // console.log("lat: " + myMarker.getPosition().lat() + ", lng: " +myMarker.getPosition().lng());
                updateInfo(myMarker, markersArray);
            });
            myMarker.addListener('drag', () => {
                deletePolyline(myPolyline);
                myPolyline = drawPolyline(markersArray, myMap);
                updateInfo(myMarker, markersArray);
            });
            if (markersArray.length === 0) {
                myMarker.setIcon(firstMarkerIcon);
                submitButton.disabled = true;
            }
            markersArray.push(myMarker);
            updateInfo(myMarker, markersArray);
            if(myPolyline) {
                deletePolyline(myPolyline);
            }
            myPolyline = drawPolyline(markersArray, myMap);
            submitButton.disabled = false;
        });
    }

    document.getElementById("btn-borrar-marcador").onclick = (e) => {
        for (let i in markersArray) {
            if (markersArray[i].getAnimation() !== null) {
                if (i === 0 && markersArray[1] !== undefined) {
                    markersArray[1].setIcon(firstMarkerIcon);
                }
                markersArray[i].setMap(null);
                markersArray.splice(i, 1);
                break;
            }
        }
        if(myPolyline) {
            deletePolyline(myPolyline);
        }
        myPolyline = drawPolyline(markersArray, myMap);
        e.target.disabled = true;
        if (markersArray.length === 0) {
            submitButton.disabled = true;
        }
    };

    submitButton.onclick = (e) => {
        let coordinate = [];
        let tituloEvent = document.getElementById("tituloEvent");
		let select = document.getElementById("idSport");
		let dateTime = document.getElementById("dateTime");
		let description = document.getElementById("descriptionEvent");
		let linkEvent = document.getElementById("linkEvent");
		let eventTime = dateTime.value.substring(0,5);
		let eventDate = dateTime.value.substring(12,16) 
					+ "-" + dateTime.value.substring(9,11) 
					+ "-" + dateTime.value.substring(6,8);
        for (let i in markersArray) {
            coordinate.push({

                    'lat': markersArray[i].getPosition().lat(), 
                    'lng': markersArray[i].getPosition().lng()
            });
        }

	let data = {
        'idUser': idUser,
        'idSport': select.value,
        'name':tituloEvent.value,
        'description': description.value,
        'link': linkEvent.value,
        'eventTime': eventTime,
        'eventDate': eventDate,
        'route': [{coordinate}]
    };
        // TODO: send data
        console.log(data);
        var fileInput = document.getElementById("img_profile");
        var imgSource = "";
        console.log(fileInput.files[0].name);

    var formdata = new FormData();
    formdata.append("event", JSON.stringify(data));
    formdata.append("file", fileInput.files[0], fileInput.files[0].name);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://timberhut-api.herokuapp.com/v1/events", requestOptions)
      .then(response => response.text())
      .then(result => showDialog(JSON.parse(result).name))
      .catch(error => console.log('error', error));

    };

}

function showDialog(nameEvent){
	let modalText = document.getElementById("show-publication");
	let btnOk = document.getElementById("btn-ok");
	
	btnOk.onclick = function(){
		window.location.href="./dashboard.html";
	}

	modalText.innerText = "Tu evento " + nameEvent + " se ha creado con éxito";
	$("#modal").modal();
}

function deletePolyline (poly) {
    poly.setMap(null);
    poly = null;
}

// returns the new marker but it must be handled wherever this function is called
function placeMarker(latLng, map) {
	return new google.maps.Marker({position: latLng, map: map});
}

function updateInfo(marker, markersArray) {                
    //document.querySelector(".marker-info > div > .lat").innerHTML = marker.getPosition().lat().toString();
    //document.querySelector(".marker-info > div > .lng").innerHTML = marker.getPosition().lng().toString();
    for (let m of markersArray) {
        if (m === marker) {
            m.setAnimation(google.maps.Animation.BOUNCE);
        }
        else {
            m.setAnimation(null);
        }
    }
    //document.querySelector(".marker-info > div > button").disabled = false;
    document.getElementById("btn-borrar-marcador").disabled = false;
}

// function accepts array of coordinates or array of markers
function drawPolyline(points = [], map) {
    if (points.length === 0) return;
	let pathPoints;
	if (points[0].getPosition) {
		pathPoints = points.map(point => point.getPosition());
	}
	else {
		pathPoints = points;
	}
	var path = new google.maps.Polyline({
		path: pathPoints,
		geodesic: true,
		strokeColor: '#649150',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	path.setMap(map);
	return path;
}

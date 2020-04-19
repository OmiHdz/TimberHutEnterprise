var idEvent =  localStorage.getItem('idEvent');
var divMap=document.createElement("div");

function getEvents(){
	var requestEvent = new XMLHttpRequest(); //creando objeto 
	requestEvent.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responseEvent = this.responseText;
			displayEvent(JSON.parse(responseEvent));
		}
	}
	requestEvent.open('GET','https://timberhut-api.herokuapp.com/v1/events/by?id='+idEvent,true);
	requestEvent.send();

}

function displayEvent(dataEvent){

	let event =dataEvent;

	var divContent=document.getElementById("content-event");
	
		let divSpace=document.createElement("div");
		let sectionEvent=document.createElement("section");
		let divPubCol=document.createElement("div");
		let divPubCont=document.createElement("div");
		let h2=document.createElement("h2");
		let img=document.createElement("img");
		let divPubDesc= document.createElement("div");
		let divPubDescTag= document.createElement("div");
		let a=document.createElement("a");
		let p=document.createElement("p");
		let h4=document.createElement("h4");
		let pAuthor=document.createElement("p");
		let pTime=document.createElement("p");
		let pDate=document.createElement("p");	

		let divCalendar=document.createElement("div");

		let divMapContainer=document.createElement("div");
		let divMapContainerChild=document.createElement("div");
		let divNull1=document.createElement("div");
		let divNull2=document.createElement("div");

		
		h2.innerText=event.name;
		img.src=event.photo;
		a.innerText=event.link;
		a.setAttribute('href',event.link);
		p.innerText=event.description;
		pAuthor.innerText="Organizado por: " + event.nameAuthor;
		h4.innerText=event.nameSport;
		pTime.innerText="Hora: "+event.eventTime;
		pDate.innerText="Fecha: "+event.eventDate;


		divSpace.classList.add("p-4");
		sectionEvent.classList.add("publication-event");
		divPubCol.classList.add("d-flex");
		divPubCol.classList.add("justify-content-center");
		divPubCont.classList.add("p-5");
		divPubCont.id="publication__content";
		img.id="publication__img";
		h2.classList.add("publication__h2--title");
		divPubDesc.classList.add("publication__description");
		divPubDesc.id="publication__description";
		divPubDescTag.classList.add("publication__description--tag");
		divMapContainer.classList.add("d-flex");
		divMapContainer.classList.add("p-5");
		divMapContainerChild.classList.add("d-flex");
		divMapContainerChild.classList.add("justify-content-between");
		divMapContainerChild.id="publication__map";
		divMap.id="googleMap";

		sectionEvent.appendChild(divSpace);
		divPubDesc.appendChild(h4);
		divPubDesc.appendChild(pTime);
		divPubDesc.appendChild(pDate);		
		divPubDesc.appendChild(p);
		divPubDesc.appendChild(divPubDescTag);
		divPubDescTag.appendChild(a);
		divPubDesc.appendChild(pAuthor);
		divPubCont.appendChild(h2);
		divPubCont.appendChild(img);
		divPubCont.appendChild(divPubDesc);
		divPubCol.appendChild(divPubCont);
		divPubCol.appendChild(divCalendar);
		sectionEvent.appendChild(divPubCol);
		sectionEvent.appendChild(divMapContainer);
		divContent.appendChild(sectionEvent);
		divMapContainerChild.appendChild(divNull1);
		divMapContainerChild.appendChild(divMap);
		
		divMapContainerChild.appendChild(divNull2);
		divMapContainer.appendChild(divMapContainerChild);

		console.log(event);
		loadMapRoute();
}

function loadMapRoute(){
let myMap;
let firstMarkerIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
// hardcoded values
let position = [];
	
loadRoute();
function initMap() {
	    let startPosition = {"lat":position[0].lat, "lng":position[0].lng}; 
	    var mapProp = {
        center: startPosition,
        disableDoubleClickZoom: true,
		zoom: 12
	};
	myMap = new google.maps.Map(divMap, mapProp);
    
    let markersArray = [];
    let myPolyline;
	// chack if map was initialized
	if (myMap) {
		// add functions that places a marker on clicked point in map
            // create, prepare, and push marker into array
            for(let i in position)
            {
	            let myMarker = placeMarker(position[i], myMap);
	            if (markersArray.length === 0) {
	                myMarker.setIcon(firstMarkerIcon);
	            }
	            markersArray.push(myMarker);
	            updateInfo(myMarker, markersArray);
	            if(myPolyline) {
	                deletePolyline(myPolyline);
	            }
	            myPolyline = drawPolyline(markersArray, myMap);
			}
    }

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
    for (let m of markersArray) {
        if (m === marker) {
            m.setAnimation(google.maps.Animation.BOUNCE);
        }
        else {
            m.setAnimation(null);
        }
    }
}

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

	function loadRoute(){
		//Objeto para hacer peticiones
		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200) {
			var responseEvent = this.responseText;
			processData(JSON.parse(responseEvent));
			}	
		}
		request.open("GET", "https://timberhut-api.herokuapp.com/v1/events/by?id=" + idEvent,true)
		request.send();
	}
	function processData(data){
		let points = data.route[0].coordinate;
	 	for(let i in points){
	 		position.push({"lat":points[i].lat, "lng":points[i].lng});
	 	}
	 	initMap();
	}
}
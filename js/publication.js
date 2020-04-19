var idPublication =  localStorage.getItem('idPublication');
var divMap=document.createElement("div");

function getPublication(){
	var requestPublication = new XMLHttpRequest(); //creando objeto 
	requestPublication.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responsePublication = this.responseText;
			displayPublication(JSON.parse(responsePublication));
		}
	}
	requestPublication.open('GET','https://timberhut-api.herokuapp.com/v1/publications/by?id='+idPublication,true);
	requestPublication.send();

}

function displayPublication(dataPublication){

	let publication =dataPublication;

	var divContent=document.getElementById("content-publication");
	
		let divSpace=document.createElement("div");
		let sectionEvent=document.createElement("section");
		let divPubCol=document.createElement("div");
		let divPubCont=document.createElement("div");
		let h2=document.createElement("h2");
		let h4=document.createElement("h4");
		let pAuthor=document.createElement("p");
		let img=document.createElement("img");
		let divPubDesc= document.createElement("div");
		let divPubDescTag= document.createElement("div");
		let p=document.createElement("p");

		let divCalendar=document.createElement("div");

		let divMapContainer=document.createElement("div");
		let divMapContainerChild=document.createElement("div");
		let divNull1=document.createElement("div");
		let divNull2=document.createElement("div");

		
		h2.innerText=publication.name;
		h4.innerText=publication.nameSport;
		img.src=publication.photo;
		p.innerText=publication.text;
		pAuthor.innerText="Publicado por: " + publication.nameAuthor;

		divSpace.classList.add("p-4");
		sectionEvent.classList.add("publication-event");
		divPubCol.classList.add("d-flex");
		divPubCol.classList.add("justify-content-center");
		divPubCont.classList.add("p-5");
		divPubCont.classList.add("text-center");
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
		p.classList.add("pPublication");
		pAuthor.classList.add("p-5");


		sectionEvent.appendChild(divSpace);
		divPubDesc.appendChild(divPubDescTag);
		divPubDesc.appendChild(h4);
		divPubDesc.appendChild(p);
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
		request.open("GET", "https://timberhut-api.herokuapp.com/v1/publications/by?id=" + idPublication,true)
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

function getEvents(){
	var requestEvent = new XMLHttpRequest(); //creando objeto 
	requestEvent.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responseEvent = this.responseText;
			displayEvent(JSON.parse(responseEvent));
		}
	}
	requestEvent.open('GET','https://timberhut-api.herokuapp.com/v1/events',true);
	requestEvent.send();
	
}

function displayEvent(dataEvent){
	
	
	console.log(dataEvent);

	var divContent=document.getElementById("calendarDisplay_content");
		for(let event of dataEvent){
		
		let sectionEvent=document.createElement("section");
		let divPubCol=document.createElement("div");
		let divPubColNull1=document.createElement("div");
		let divPubCont=document.createElement("div");
		let divPubColNull2=document.createElement("div");
		let h2=document.createElement("h2");


		
		let divPubDesc= document.createElement("div");
		let divPubDescTag= document.createElement("div");

		let divMedia=document.createElement("div");
		let divMediaContainer=document.createElement("div");
		let img=document.createElement("img");
		let divMediaBody=document.createElement("div");
		let h5=document.createElement("div");
		let a=document.createElement("a");
		let p=document.createElement("p");
		let button=document.createElement("button");
		
		h2.innerText=event.name;
		img.src=event.photo;
		a.innerText=event.link;
		p.innerText=event.description;
		button.innerText="Ir a Evento";

		let idEvent = event.id;
		button.onclick=function(){
			localStorage.setItem('idEvent', idEvent);
			window.location.href="./event.html";
		}

		sectionEvent.classList.add("publication-event");
		divPubColNull1.classList.add("p");
		divPubCol.classList.add("d-flex");
		divPubCol.classList.add("justify-content-center");
		divPubColNull2.classList.add("p");
		divPubCont.classList.add("p-5");
		
		img.id="displayEvent__img";
		h2.classList.add("publication__h2--title");
		divPubDesc.classList.add("publication__description");
		divPubDesc.id="publication__description";
		divPubDescTag.classList.add("publication__description--tag");
		divMedia.classList.add("media");
		divMediaBody.classList.add("media-body");
		divMedia.id="mediaCalendar";
		p.classList.add("contenido-letra");
		h5.classList.add("mt-0");
		button.classList.add("btn");
		button.classList.add("btn-primary");
		button.id="btnPrimary";	

		divPubDesc.appendChild(divPubDescTag);
		
		divPubCont.appendChild(h2);
		
		divPubCont.appendChild(divPubDesc);
		divPubCol.appendChild(divPubCont);

		sectionEvent.appendChild(divPubCol);
		divContent.appendChild(sectionEvent);
		
		divPubCont.appendChild(divMedia);
		divMedia.appendChild(divMediaContainer);
		divMedia.appendChild(divMediaBody);
		divMediaContainer.appendChild(img);
		divMediaBody.appendChild(h5);
		divMediaBody.appendChild(p);
		divMediaBody.appendChild(a);
		divMedia.appendChild(button);

		}

}
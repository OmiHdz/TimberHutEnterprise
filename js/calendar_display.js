
function getEvents(){
	var requestEvent = new XMLHttpRequest(); //creando objeto 
	requestEvent.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responseEvent = this.responseText;
			//console.log(JSON.parse(responseEvent));
			displayEvent(JSON.parse(responseEvent));
		}
	}
	requestEvent.open('GET','http://localhost:8080/v1/events',true);
	requestEvent.send();
	
}

function displayEvent(dataEvent){
	
	
	console.log(dataEvent);

	var divContent=document.getElementById("calendarDisplay_content");
		for(let event of dataEvent){
		
		let sectionEvent=document.createElement("section");
		let divPubCol=document.createElement("div");
		let divPubCont=document.createElement("div");
		let h2=document.createElement("h2");
		let img=document.createElement("img");
		let divPubDesc= document.createElement("div");
		let divPubDescTag= document.createElement("div");
		let a=document.createElement("a");
		let p=document.createElement("p");
		let button=document.createElement("button");



		
		h2.innerText=event.name;
		img.src=event.photo;
		a.innerText=event.link;
		p.innerText=event.description;
		button.innerText="Ir a Evento";
		button.onclick=function(){
			localStorage.setItem('idEvent', event.id);
			window.location.href="./event.html";
		}


		sectionEvent.classList.add("publication-event");
		divPubCol.classList.add("d-flex");
		divPubCol.classList.add("justify-content-center");
		divPubCont.classList.add("p-5");
		img.id="publication__img";
		h2.classList.add("publication__h2--title");
		divPubDesc.classList.add("publication__description");
		divPubDesc.id="publication__description";
		divPubDescTag.classList.add("publication__description--tag");
		button.classList.add("btn");
		button.classList.add("btn-primary");


		divPubDescTag.appendChild(a);
		divPubDesc.appendChild(divPubDescTag);
		divPubDesc.appendChild(p);
		divPubCont.appendChild(h2);
		divPubCont.appendChild(img);
		divPubCont.appendChild(divPubDesc);
		divPubCol.appendChild(divPubCont);
		sectionEvent.appendChild(divPubCol);
		divContent.appendChild(sectionEvent);
		divPubCont.appendChild(button);
		

		
		
		
		

		console.log(event);
	

		}

}
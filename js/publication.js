

function getPublication(){
	
	var requestPublication = new XMLHttpRequest(); //creando objeto 
	requestPublication.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responsePublication = this.responseText;
			
			//console.log(JSON.parse(responsePublication));
			displayPublication(JSON.parse(responsePublication));
		}
	}
	requestPublication.open('GET','http://localhost:8080/v1/publications/by?id=1',true);
	requestPublication.send();
}

function displayPublication(dataPublication){

	let publication=dataPublication;
	//console.log(dataPublication);

	var divContent=document.getElementById("content-publication");
	
		
		let divSpace=document.createElement("div");
		let sectionPublication=document.createElement("section");
		let divPubCol=document.createElement("div");
		let divPubNull1=document.createElement("div");
		let divPubCont=document.createElement("div");
		let h2=document.createElement("h2");
		let img=document.createElement("img");
		let divPubDesc= document.createElement("div");
		let divPubDescTag= document.createElement("div");
		let a=document.createElement("a");
		let p=document.createElement("p");

		let divMapContainer=document.createElement("div");
		let divMapContainerChild=document.createElement("div");
		let divNull1=document.createElement("div");
		let divMap=document.createElement("div");
		let divNull2=document.createElement("div");
		
		let divPubNull2=document.createElement("div");

		let link =document.getElementById("publication_img");
		h2.innerText=publication.name;
		img.src=publication.photo;
		a.innerText=publication.link;
		a.setAttribute('href',publication.link);
		p.innerText=publication.text;

		divSpace.classList.add("p-4");
		sectionPublication.classList.add("publication-event");
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

		sectionPublication.appendChild(divSpace);
		divPubDescTag.appendChild(a);
		divPubDesc.appendChild(divPubDescTag);
		divPubDesc.appendChild(p);
		divPubCont.appendChild(h2);
		divPubCont.appendChild(img);
		divPubCont.appendChild(divPubDesc);
		divPubCol.appendChild(divPubCont);
		sectionPublication.appendChild(divPubCol);
		sectionPublication.appendChild(divMapContainer);
		divContent.appendChild(sectionPublication);
		divMapContainerChild.appendChild(divNull1);
		divMapContainerChild.appendChild(divMap);
		
		divMapContainerChild.appendChild(divNull2);
		divMapContainer.appendChild(divMapContainerChild);;

		console.log(publication);
	



}
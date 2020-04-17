

function getPublication(){
	
	var requestPublication = new XMLHttpRequest(); //creando objeto 
	requestPublication.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responsePublication = this.responseText;
			
			//console.log(JSON.parse(responsePublication));
			displayPublication(JSON.parse(responsePublication));
		}
	}
	requestPublication.open('GET','http://localhost:8080/v1/publications',true);
	requestPublication.send();
}

function displayPublication(dataPublication){

	//let publication=dataPublication;
	
	console.log(dataPublication);

	var divMain=document.getElementById("info");
		
	for(var publication of dataPublication){
		

		let main=document.createElement("main");
		
		let divPost=document.createElement("div");
		let divContentPost=document.createElement("div");
		let divContentImg=document.createElement("div");
		let img=document.createElement("img");
		let h2=document.createElement("h2");
		let a=document.createElement("a");


		
		
		h2.innerText=publication.name;
		img.src=publication.photo;
		img.id="publication__img";
		a.innerText=publication.link;
		a.setAttribute('href',publication.link);
		
		main.classList.add("informacion");
		divPost.classList.add("post");
		divContentPost.classList.add("content-post");
		divContentImg.classList.add("img-content");
		h2.classList.add("publication__h2--title");


		//main.appendChild(h2Title);
		//main.appendChild(divPost);
		divMain.appendChild(divPost);
		divPost.appendChild(divContentPost);
		divContentPost.appendChild(divContentImg);
		divContentPost.appendChild(h2);
		divContentPost.appendChild(a);
		divContentImg.appendChild(img);

		console.log(publication);
	

	}

}
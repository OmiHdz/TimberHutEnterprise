function getSports(){
	var requestSport = new XMLHttpRequest(); //creando objeto 
	requestSport.onreadystatechange = function(){
		if (this.readyState ==4 && this.status ==200) {
			var responseSport = this.responseText;
			console.log(JSON.parse(responseSport));
			displaySport(JSON.parse(responseSport));
		}
	}
	requestSport.open('GET','https://timberhut-api.herokuapp.com/v1/sports',true);
	requestSport.send();
}

function displaySport(dataSports){

	console.log(dataSports);

	var divContent=document.getElementById("content-post-pba");
	for(let sport of dataSports){
		
		console.log(sport.id);
		DinamicId=sport.id;

		let divPba=document.createElement("div");
		let divImg =document.createElement("div");
		let divText =document.createElement("div");
		let img=document.createElement("img");
		let p=document.createElement("p");
		let h4=document.createElement("h4");
		

		img.src=sport.photo;
		p.innerText=sport.description;
		h4.innerText=sport.name;
		

		divImg.classList.add("img-content");
		divText.classList.add("text-post");
		p.classList.add("desc");
		divPba.classList.add("content-post");
		sport.name=sport.name.replace(/ /g,"");
		divPba.classList.add(sport.name);

		

		divImg.appendChild(img);
		divText.appendChild(h4);
		divText.appendChild(p);
		divPba.appendChild(divImg);
		divPba.appendChild(divText);
		divContent.appendChild(divPba);
		

		console.log(sport);
	}



}





/* Codigo para filtrar Deportes*/

$(function () {
    $(".filter").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        let valor =  $(this).attr("data-nombre");
        if(valor == "todos"){
        	$(".content-post").show("1000");	
        }else{
        	$(".content-post").not("."+ valor).hide("1000");
        	$(".content-post").filter("."+ valor).show("1000");
        }        
    });
});


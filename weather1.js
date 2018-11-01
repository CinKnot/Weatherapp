//let appId = '5c343f01de0b15c9f50f4e0457f6df60';
//let units = 'metric';
//let searchMethod = 'q'

document.getElementById('searchBtn').addEventListener('click',()=>{
let searchTerm = document.getElementById('searchInput').value;
	searchWeather(searchTerm);
})
//if(searchTerm)
//searchWeather(searchTerm);
//})

function searchWeather(city) {
	console.log(city)
	fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&APPID=5c343f01de0b15c9f50f4e0457f6df60").then(result => {
		return result.json();
	}).then(result => {
		console.log(result);
		var allData = result;
		var nameOfCity = allData.name;
		displayInformation(nameOfCity)
		console.log(nameOfCity)
	})
}

function init(resultFromServer){
console.log(resultFromServer);
}

function displayInformation (city) {
	console.log(city)
	var div = document.getElementById("weatherDescription");
	var name = document.createElement("DIV");
	name.innerHTML = city;
	div.appendChild(name)
}
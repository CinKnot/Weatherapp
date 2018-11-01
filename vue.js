var app = new Vue({
	el: "#app",
	data: {
		input: "",
		allInfo: [],
		list: [],
		temperature: "",
		forecast: {
			today: [],
			tomorrow: [],
			overmorrow: [],
		},
		today: [],
		tomorrow: [],
		overmorrow: [],
		cityName: "",
		description: "",
		country: "",
		humidity: "",
		wind: "",
		mintemp: "",
		maxtemp: "",
		todayMax: "",
		todayMin: "",
		tomorrowMax: "",
		tomorrowMin: "",
		overmorrowMax: "",
		overmorrowMin: "",
		show: false,


	},

	methods: {
		searchWeather(city) {
			fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=5c343f01de0b15c9f50f4e0457f6df60").then(result => {
				return result.json();
			}).then(result => {

				app.allInfo = result;
				console.log(app.allInfo);
				app.list = app.allInfo.list;
				console.log(app.list);
				app.cityName = app.allInfo.city.name;
				app.country = app.allInfo.city.country;
				app.humidity = app.allInfo.list[0].main.humidity;
				app.wind = app.allInfo.list[0].wind["speed"];
				app.temperature = Math.round(app.allInfo.list[0].main.temp - 273);
				app.description = app.allInfo.list[0].weather[0].description;
				app.mintemp = Math.round(app.allInfo.list[0].main.temp_min - 273);
				app.maxtemp = Math.round(app.allInfo.list[0].main.temp_max - 273);
				app.calculatingTheArray();
				tempM = app.filterForecast(app.today, 'temp_max');
				app.todayMax = tempM;
				tempMin = app.filterForecast(app.today, 'temp_min');
				app.todayMin = tempMin;
				app.show = true;
				tomMax = app.filterForecast(app.tomorrow, 'temp_max');
				app.tomorrowMax = tomMax;
				tomMin = app.filterForecast(app.tomorrow, 'temp_min');
				app.tomorrowMin = tomMin;
				overMax = app.filterForecast(app.overmorrow, 'temp_max');
				app.overmorrowMax = overMax;
				overMin = app.filterForecast(app.overmorrow, 'temp_min');
				app.overmorrowMin = overMin;
				

			})
		},
		calculatingTheArray() {
			var array = app.allInfo.list;
			for (var i = 0; i < array.length; i++) {
				if (i < 8) {
					app.today.push(array[i]);
				}
				if (i >= 8 && i < 16) {
					app.tomorrow.push(array[i])
				}
				if (i >= 16 && i < 24) {
					app.overmorrow.push(array[i])
				}
			}
			//			console.log(app.tomorrow)
		},
		filterForecast(array, temp) {
			var total = 0;
			for (var i = 0; i < array.length; i++) {
				total += array[i].main[temp];
			}
			return (Math.round(total / array.length) - 273);
		}
	}
})

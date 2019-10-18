document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  //console.log(value);
  
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=57f4ab724e7683ea7c8f373b76e29d49";
  fetch(url).then(function(response) { return response.json(); }).then(function(json) {	
    let results = "";
    results += '<h1>Current conditions in ' + json.name + "</h1>";
    
    let temp = Number(json.main.temp);
    if (temp <= 40)
      results += '<div id="cold">'
    else if (temp >= 80)
      results += '<div id="hot">'
    else
      results += '<div id="fair">'
    results += '<h2>' + temp + " &deg;F</h2></div>";
    for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    }
    results += "<p>";
    for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description;
      if (i !== json.weather.length - 1)
          results += ", ";
    }
    results += "</p>";
    document.getElementById("weatherResults").innerHTML = results;
  });
  
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=57f4ab724e7683ea7c8f373b76e29d49";
  fetch(url2).then(function(response) { return response.json(); }).then(function(json) {
      let forecast = "";
      forecast += "<h1>5 day forecast</h1>";
      let day = "";
      for (let i=0; i < json.list.length; i++) {
        let nextDay = moment(json.list[i].dt_txt).format('MMMM Do');
        if (day != nextDay) {
          forecast += "</div>";
          forecast += "<h3>" + nextDay + "</h3>";
          forecast += '<div class="row">';
          day = nextDay;
          forecast += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1 offset-lg-2">';
        }
        else
          forecast += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1 offset-lg-0">';
  	    forecast += "<h2>" + moment(json.list[i].dt_txt).format('h a') + "</h2>";
  	    let temp = Number(json.list[i].main.temp);
  	    if (temp <= 40)
  	      forecast += '<div id="cold">'
  	    else if (temp >= 80)
  	      forecast += '<div id="hot">'
  	    else
  	      forecast += '<div id="fair">'
  	    forecast += "<p>" + json.list[i].main.temp  + " &deg;F</p></div>";
  	    forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
  	    forecast += "<p>" + json.list[i].weather[0].description + "</p>";
  	    forecast += "</div>"
      }
      forecast += "</div>";
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
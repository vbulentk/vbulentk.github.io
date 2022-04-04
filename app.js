const inputGet = document.querySelector("#cityinput");
const cityName = document.querySelector("#cityname");
const cityGet = document.querySelector("#cityoutput");
const description = document.querySelector("#description");
const country = document.querySelector("#country");

const temp = document.querySelector("#temp");
const bulut = document.querySelector("#clouds");
const ruzgar = document.querySelector("#wind");
const msgClass = document.querySelector("#msgClass");

inputGet.addEventListener("keyup", (e) => {
  if (e.which === 13) {
    cityAdd();
  }
});

function cityAdd() {
  if (inputGet.value === "") {
    // msg.textContent = "Please search for a valid city 😩";
    myalert();
  } else {
    let cityID = inputGet.value;
    cityName.innerHTML = cityID.toUpperCase();

    weatherBalloon(cityID);
    inputGet.value = "";
  }
}

function weatherBalloon(cityID) {
  var key = "2cccff501140131a9824bbe34b84d4e5";
  //   var cityID = "izmir";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityID +
      "&units=imperial&APPID=" +
      key +
      "&lang=tr"
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);
      var celcius = Math.round((parseFloat(data.main.temp) - 32) * 0.55);
      console.log(celcius);
      cityGet.innerHTML = celcius + `<small>&#160;°C</small>`;
      country.innerHTML = data.sys.country;
      // description.innerHTML = data.weather[0].icon;
      ruzgar.innerHTML =
        `<small>Rüzgar: </small>` +
        data.wind.speed +
        `<small>&#160;km/s</small>`;

      bulut.innerHTML = `<small>Hava: </small>` + data.weather[0].description;
    })
    .catch(function () {
      //   msg.textContent = "Please search for a valid city 😩";
    });
}


function myalert() {
  alert("This is the Alert Message!");
  cityGet.innerHTML = "";
  ruzgar.innerHTML = "";
  bulut.innerHTML = "";
  cityName.innerHTML = "";
}

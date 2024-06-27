"use strict";

//base url = 038c17b596fb4d68a6c94356241406

//index
let searchBtn = document.querySelector("#searh-btn");
let cityInput = document.querySelector("#cityInput");


//contact
let userName=document.querySelector('.name')
let userEmail=document.querySelector('.user-email')
let companyName=document.querySelector('.company')
let websiteURL=document.querySelector('.websiteURL')
let message=document.querySelector('textarea')


cityInput.addEventListener("input", function () {
  const city = cityInput.value;
  // console.log(city);
  getWeather(city);

});

// weather
async function getWeather(city='cairo') {
  let dataWeek = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=038c17b596fb4d68a6c94356241406&q=${city}&days=7`);
  let responseWeek = await dataWeek.json();
  // console.log(responseWeek);

  //date
  let dateCurrent = new Date(responseWeek.current.last_updated);
  let forecastTomorrow = new Date(responseWeek.forecast.forecastday[1].date);
  let forecastAfterTomorrow = new Date(
    responseWeek.forecast.forecastday[2].date
  );

  //location
  const address = responseWeek.location.name;
  //display   date
  getDate(dateCurrent, forecastTomorrow, forecastAfterTomorrow);
  getTemp(responseWeek);
  //display location
  displayWeather(address);

  //display icon
  getIcon(responseWeek);

  document.querySelector(".icons").classList.replace("d-none", "d-block");

  //display status
  getstatus(responseWeek);


}
getWeather()
// display
function displayWeather(address) {
  document.querySelector(".location").innerHTML = `${address}`;
}

//date
function getDate(dateCurrent, forecastTomorrow, forecastAfterTomorrow) {
  let date = dateCurrent.getDate();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateCurrent.getDay()];
  let day1 = days[forecastTomorrow.getDay()];
  let day2 = days[forecastAfterTomorrow.getDay()];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[dateCurrent.getMonth()];
  displayDate(day, date, month, day1, day2);
}
function displayDate(day, date, month, day1, day2) {
  document.querySelector(".date").innerHTML = `${date}${month}`;
  document.querySelector(".day").innerHTML = `${day}`;
  document.querySelector(".day1").innerHTML = `${day1}`;
  document.querySelector(".day2").innerHTML = `${day2}`;
}

//temp
function getTemp(responseWeek) {
  const currentTemp = responseWeek.current.temp_c;
  const maxTemp1 = responseWeek.forecast.forecastday[1].day.maxtemp_c;
  const minTemp1 = responseWeek.forecast.forecastday[1].day.mintemp_c;

  const maxTemp2 = responseWeek.forecast.forecastday[2].day.maxtemp_c;
  const minTemp2 = responseWeek.forecast.forecastday[2].day.mintemp_c;

  displayTemp(currentTemp, maxTemp1, minTemp1, maxTemp2, minTemp2);
}
function displayTemp(currentTemp, maxTemp1, minTemp1, maxTemp2, minTemp2) {
  document.querySelector(
    ".current-temp"
  ).innerHTML = `${currentTemp}<sup>o</sup>C`;

  document.querySelector(".maxTemp1").innerHTML = `${maxTemp1}<sup>o</sup>C`;

  document.querySelector(".minTemp1").innerHTML = `${minTemp1}<sup>o</sup>C`;

  document.querySelector(".maxTemp2").innerHTML = `${maxTemp2}<sup>o</sup>C`;

  document.querySelector(".minTemp2").innerHTML = `${minTemp2}<sup>o</sup>C`;
}

//icon
function getIcon(responseWeek) {
  //icon
  let iconCurrent = responseWeek.current.condition.icon;
  let iconDay1 = responseWeek.forecast.forecastday[1].day.condition.icon;
  let iconDay2 = responseWeek.forecast.forecastday[2].day.condition.icon;

  let correctedIconCurrent = iconCurrent.replace("//", "https://");
  let correctedIconDay1 = iconDay1.replace("//", "https://");
  let correctedIconDay2 = iconDay2.replace("//", "https://");

  displayIcon(correctedIconCurrent, correctedIconDay1, correctedIconDay2);
}

function displayIcon(
  correctedIconCurrent,
  correctedIconDay1,
  correctedIconDay2
) {
  document.querySelector(".icon-current").src = `${correctedIconCurrent}`;
  document.querySelector(".icon-Day1").src = `${correctedIconDay1}`;
  document.querySelector(".icon-Day2").src = `${correctedIconDay2}`;
}

//status
function getstatus(responseWeek) {
  let statusCurrent = responseWeek.current.condition.text;
  let statusDay1 = responseWeek.forecast.forecastday[1].day.condition.text;
  let statusDay2 = responseWeek.forecast.forecastday[2].day.condition.text;

  displayStatus(statusCurrent, statusDay1, statusDay2);
}
function displayStatus(statusCurrent, statusDay1, statusDay2) {
  document.querySelector(".statusCurrent").innerHTML = `${statusCurrent}`;
  document.querySelector(".statusDay1").innerHTML = `${statusDay1}`;
  document.querySelector(".statusDay2").innerHTML = `${statusDay2}`;
}

//user location
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  displayLocation(lat, lon);
}
async function displayLocation(lat, lon) {
  const city = `${lat}+${lon}`;
  console.log(city);
  getWeather(city);


}

window.onload = getLocation;



//clear data


function clearData() {
if( userName.value!=''&&
    userEmail.value!=''&&
    companyName.value!=''&&
    websiteURL.value!=''&&
    message.value!=''){
  userName.value=null
userEmail.value=null
companyName.value=null
websiteURL.value=null
message.value=null
}
} 

























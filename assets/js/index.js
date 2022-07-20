const apiKey = '3fc69ca6d146e6d29bd695aeea3d66b3'
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let cityInput = document.getElementById('cityInput').value
const cityBtn = document.getElementById('cityButton').addEventListener("click", cityGeo)
let currentCityText = document.getElementById('currentCity')
let currentCityTemp = document.getElementById('currentTemp')
let currentCityWind = document.getElementById('currentWind')
let currentCityUv = document.getElementById('currentUv')
let currentHumidity = document.getElementById('currentHumidity')
let dayOne = document.getElementById('day1')
let dayTwo = document.getElementById('day2')
let dayThree = document.getElementById('day3')
let dayFour = document.getElementById('day4')
let dayFive = document.getElementById('day5')
let dayOneTemp = document.getElementById('day1Temp')
let dayTwoTemp = document.getElementById('day2Temp')
let dayThreeTemp = document.getElementById('day3Temp')
let dayFourTemp = document.getElementById('day4Temp')
let dayFiveTemp = document.getElementById('day5Temp')
let dayOneWind = document.getElementById('day1Wind')
let dayTwoWind = document.getElementById('day2Wind')
let dayThreeWind = document.getElementById('day3Wind')
let dayFourWind = document.getElementById('day4Wind')
let dayFiveWind = document.getElementById('day5Wind')
let dayOneHum = document.getElementById('day1Humidity')
let dayTwoHum = document.getElementById('day2Humidity')
let dayThreeHum = document.getElementById('day3Humidity')
let dayFourHum = document.getElementById('day4Humidity')
let dayFiveHum = document.getElementById('day5Humidity')
let dayOneUv = document.getElementById('day1Uv')
let dayTwoUv = document.getElementById('day2Uv')
let dayThreeUv = document.getElementById('day3Uv')
let dayFourUv = document.getElementById('day4Uv')
let dayFiveUv = document.getElementById('day5Uv')
let savedCities = JSON.parse(localStorage.getItem('recentCities')) || []
let recentDisplay = document.getElementById('recentCities')
let imgStatus = document.getElementById('imgStatus')
let imgOne = document.getElementById('day1Img')
let imgTwo = document.getElementById('day2Img')
let imgThree = document.getElementById('day3Img')
let imgFour = document.getElementById('day4Img')
let imgFive = document.getElementById('day5Img')

for (var i = 0; i < savedCities.length; i++) {
    let createTag = document.createElement('button')
    createTag.textContent = savedCities[i]
    createTag.classList.add('renderBtn')
    createTag.addEventListener("click", function render () {
        let renderOne = createTag.textContent
        cityInput = renderOne
        console.log(cityInput)
        savedRender()
    })
    recentDisplay.appendChild(createTag)
}

function cityGeo () {
    let cityInput = document.getElementById('cityInput').value
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || []
    recentCities.push(cityInput)
    localStorage.setItem('recentCities', JSON.stringify(recentCities))
    console.log(cityInput)
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let cityLat = data[0].lat
        let cityLon = data[0].lon
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            let imgLink = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            let newImg1 = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
            let newImg2 = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
            let newImg3 = `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
            let newImg4 = `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
            let newImg5 = `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
            imgOne.src = newImg1
            imgTwo.src = newImg2
            imgThree.src = newImg3
            imgFour.src = newImg4
            imgFive.src = newImg5
            imgStatus.src = imgLink
            currentCityTemp.textContent = `${data.current.temp}°F`
            currentCityWind.textContent = `${data.current.wind_speed}m/s`
            currentCityUv.textContent = `${data.current.uvi}`
            currentHumidity.textContent = `${data.current.humidity}%`
            let unixTime0 = data.daily[0].dt
            let unixTime1 = data.daily[1].dt
            let unixTime2 = data.daily[2].dt
            let unixTime3 = data.daily[3].dt
            let unixTime4 = data.daily[4].dt
            let unixTime5 = data.daily[5].dt
            let unix0 = new Date(unixTime0 * 1000)
            let unix1 = new Date(unixTime1 * 1000)
            let unix2 = new Date(unixTime2 * 1000)
            let unix3 = new Date(unixTime3 * 1000)
            let unix4 = new Date(unixTime4 * 1000)
            let unix5 = new Date(unixTime5 * 1000)
            let day0 = unix0.getDate()
            let day1 = unix1.getDate()
            let day2 = unix2.getDate()
            let day3 = unix3.getDate()
            let day4 = unix4.getDate()
            let day5 = unix5.getDate()
            let month0 = months[unix0.getMonth()]
            let month1 = months[unix1.getMonth()]
            let month2 = months[unix1.getMonth()]
            let month3 = months[unix1.getMonth()]
            let month4 = months[unix1.getMonth()]
            let month5 = months[unix1.getMonth()]
            dayOne.textContent = `${day1} ${month1}`
            dayTwo.textContent = `${day2} ${month2}`
            dayThree.textContent = `${day3} ${month3}`
            dayFour.textContent = `${day4} ${month4}`
            dayFive.textContent = `${day5} ${month5}`
            currentCityText.textContent = `Weather in ${cityInput} - ${day0} ${month0} 2022`
            // day 1 stuff
            dayOneTemp.textContent = `Temperature: ${data.daily[1].temp.max}°F`
            dayOneWind.textContent = `Wind Speed: ${data.daily[1].wind_speed}m/s`
            dayOneHum.textContent = `Humidity: ${data.daily[1].humidity}%`
            dayOneUv.textContent = `UV Index: ${data.daily[1].uvi}`
            // day 2 stuff
            dayTwoTemp.textContent = `Temperature: ${data.daily[2].temp.max}°F`
            dayTwoWind.textContent = `Wind Speed: ${data.daily[2].wind_speed}m/s`
            dayTwoHum.textContent = `Humidity: ${data.daily[2].humidity}%`
            dayTwoUv.textContent = `UV Index: ${data.daily[2].uvi}`
            // day 3 stuff
            dayThreeTemp.textContent = `Temperature: ${data.daily[3].temp.max}°F`
            dayThreeWind.textContent = `Wind Speed: ${data.daily[3].wind_speed}m/s`
            dayThreeHum.textContent = `Humidity: ${data.daily[3].humidity}%`
            dayThreeUv.textContent = `UV Index: ${data.daily[3].uvi}`
            // day 4 stuff
            dayFourTemp.textContent = `Temperature: ${data.daily[4].temp.max}°F`
            dayFourWind.textContent = `Wind Speed: ${data.daily[4].wind_speed}m/s`
            dayFourHum.textContent = `Humidity: ${data.daily[4].humidity}%`
            dayFourUv.textContent = `UV Index: ${data.daily[4].uvi}`
            // day 5 stuff
            dayFiveTemp.textContent = `Temperature: ${data.daily[5].temp.max}°F`
            dayFiveWind.textContent = `Wind Speed: ${data.daily[5].wind_speed}m/s`
            dayFiveHum.textContent = `Humidity: ${data.daily[5].humidity}%`
            dayFiveUv.textContent = `UV Index: ${data.daily[5].uvi}`
            
        })
    })
}

function savedRender () {
    console.log(cityInput)
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let cityLat = data[0].lat
        let cityLon = data[0].lon
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            let imgLink = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            let newImg1 = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`
            let newImg2 = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`
            let newImg3 = `https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`
            let newImg4 = `https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`
            let newImg5 = `https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png`
            imgOne.src = newImg1
            imgTwo.src = newImg2
            imgThree.src = newImg3
            imgFour.src = newImg4
            imgFive.src = newImg5
            imgStatus.src = imgLink
            currentCityTemp.textContent = `${data.current.temp}°F`
            currentCityWind.textContent = `${data.current.wind_speed}m/s`
            currentCityUv.textContent = `${data.current.uvi}`
            currentHumidity.textContent = `${data.current.humidity}%`
            let unixTime0 = data.daily[0].dt
            let unixTime1 = data.daily[1].dt
            let unixTime2 = data.daily[2].dt
            let unixTime3 = data.daily[3].dt
            let unixTime4 = data.daily[4].dt
            let unixTime5 = data.daily[5].dt
            let unix0 = new Date(unixTime0 * 1000)
            let unix1 = new Date(unixTime1 * 1000)
            let unix2 = new Date(unixTime2 * 1000)
            let unix3 = new Date(unixTime3 * 1000)
            let unix4 = new Date(unixTime4 * 1000)
            let unix5 = new Date(unixTime5 * 1000)
            let day0 = unix0.getDate()
            let day1 = unix1.getDate()
            let day2 = unix2.getDate()
            let day3 = unix3.getDate()
            let day4 = unix4.getDate()
            let day5 = unix5.getDate()
            let month0 = months[unix0.getMonth()]
            let month1 = months[unix1.getMonth()]
            let month2 = months[unix1.getMonth()]
            let month3 = months[unix1.getMonth()]
            let month4 = months[unix1.getMonth()]
            let month5 = months[unix1.getMonth()]
            dayOne.textContent = `${day1} ${month1}`
            dayTwo.textContent = `${day2} ${month2}`
            dayThree.textContent = `${day3} ${month3}`
            dayFour.textContent = `${day4} ${month4}`
            dayFive.textContent = `${day5} ${month5}`
            currentCityText.textContent = `Weather in ${cityInput} - ${day0} ${month0} 2022`
            // day 1 stuff
            dayOneTemp.textContent = `Temperature: ${data.daily[1].temp.max}°F`
            dayOneWind.textContent = `Wind Speed: ${data.daily[1].wind_speed}m/s`
            dayOneHum.textContent = `Humidity: ${data.daily[1].humidity}%`
            dayOneUv.textContent = `UV Index: ${data.daily[1].uvi}`
            // day 2 stuff
            dayTwoTemp.textContent = `Temperature: ${data.daily[2].temp.max}°F`
            dayTwoWind.textContent = `Wind Speed: ${data.daily[2].wind_speed}m/s`
            dayTwoHum.textContent = `Humidity: ${data.daily[2].humidity}%`
            dayTwoUv.textContent = `UV Index: ${data.daily[2].uvi}`
            // day 3 stuff
            dayThreeTemp.textContent = `Temperature: ${data.daily[3].temp.max}°F`
            dayThreeWind.textContent = `Wind Speed: ${data.daily[3].wind_speed}m/s`
            dayThreeHum.textContent = `Humidity: ${data.daily[3].humidity}%`
            dayThreeUv.textContent = `UV Index: ${data.daily[3].uvi}`
            // day 4 stuff
            dayFourTemp.textContent = `Temperature: ${data.daily[4].temp.max}°F`
            dayFourWind.textContent = `Wind Speed: ${data.daily[4].wind_speed}m/s`
            dayFourHum.textContent = `Humidity: ${data.daily[4].humidity}%`
            dayFourUv.textContent = `UV Index: ${data.daily[4].uvi}`
            // day 5 stuff
            dayFiveTemp.textContent = `Temperature: ${data.daily[5].temp.max}°F`
            dayFiveWind.textContent = `Wind Speed: ${data.daily[5].wind_speed}m/s`
            dayFiveHum.textContent = `Humidity: ${data.daily[5].humidity}%`
            dayFiveUv.textContent = `UV Index: ${data.daily[5].uvi}`
            
        })
    })
}

cityGeo()
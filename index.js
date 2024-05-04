const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 p img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("nav form");

let target = "delhi";


const fetchData = async (target)=>{
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=85616db22dac4aeda70135315240305&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // updateDom(data.current.temp_c, data.location.name);
    //                            OR
    // by using destructuring 
    const{
        current : {temp_c , condition : {
            text , icon
        }},
        location : {name , localtime}
    } = data;
    updateDom(temp_c , name , localtime , icon , text)
    } catch (error) {
        alert("Location not found");
    }
}

function updateDom (temperature, city, time , emoji, text){
    temperatureField.innerText = temperature;
    cityField.innerText = city;
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    dateField.innerText = `${exactTime} - ${getFullDayName(exactDay)} - ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;

}

fetchData(target);

function getFullDayName(num){
    switch (num) {
        case 0:
            return "Sunday";
            break;
        
        case 1:
            return "Monday";
            break;
        
        case 2:
            return "Tuesday";
            break;

        case 3:
            return "Wednesday";
            break;

        case 4:
            return "Thrusday";
            break;

        case 5:
            return "Friday";
            break;
        default:
            return "Saturday";
            break;
    }
}

// function to search the location
const search = (e)=>{
    e.preventDefault();

    target = searchField.value;
    
    fetchData(target);

}

form.addEventListener("submit" , search)



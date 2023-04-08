/* Global Variables */
const generate = document.getElementById("generate");
const country = document.getElementById('country');
const innerDate = document.getElementById("date");
const innerCity = document.getElementById("city");
const innerTemp = document.getElementById("temp");
const innerDesc = document.getElementById("description");
const innerContent = document.getElementById("content");

// showing the error to the user
const error = document.getElementById("error");

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=66839c551a16879317374b143be3e529&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// let date = d.getMonth() + '.' + d.getDate()+'.'+d.getFullYear();



const generateData = () => {
    //get value after click on the button
    const country = document.getElementById("country").value;
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    const entry = document.getElementById('entry').style.opacity = 1;

    const madeURL = `${baseURL}${zip},${country}${key}`;
    // getWeatherData return promise
    getWeatherData(madeURL).then((data) => {
        if (data) {
            const {
                sys: {country},
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round((Math.round(temp)-32)/1.8), // to get integer number
                description,
                feelings,
                country,
            };

            postData("/add", info);

            updatingUI();
            entry;
        }
    });
};

generate.addEventListener("click", generateData);

//Function to GET Web API Data
const getWeatherData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        if (data.cod != 200) {
            // display the error message on UI
            error.innerHTML = data.message;
            setTimeout(() => (error.innerHTML = ""), 6000);
            throw `${data.message}`;
        }

        return data;
    } catch (error) {
        console.log(error);
    }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const newData = await res.json();
        console.log(`You just saved`, newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
    const res = await fetch("/all");
    try {
        const savedData = await res.json();

        innerDate.innerHTML = savedData.newDate;
        innerCity.innerHTML = savedData.city + ", " + savedData.country;
        innerTemp.innerHTML = savedData.temp + '&degC';
        innerDesc.innerHTML = savedData.description;
        innerContent.innerHTML = savedData.feelings ? savedData.feelings : "What do you feel &#128517;";

        if(savedData.temp < 32){
            document.querySelector("img").setAttribute("src", "./snow.png");
        }else if(savedData.temp>80){
            document.querySelector("img").setAttribute("src", "./hot.png");
        }else{
            document.querySelector("img").setAttribute("src", "./normal.png");
        }

    } catch (error) {
        console.log(error);
    }
};

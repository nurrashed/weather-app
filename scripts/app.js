const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => { //Here data is an object
/*   const cityDets = data.cityDets;
  const weather = data.weather; */
    console.log(data);
  //destructure properties from object
  const {cityDets, weather} = data; 

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
   `;


    //Update the night/day & icon images

    const iconSrc = `image/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'image/day.svg';
    }else {
        timeSrc = 'image/night.svg'
    }

    time.setAttribute('src', timeSrc);

  //remove d-none class if it is present
  if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  console.log(cityDets, weather);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get city value
  const city = cityForm.city.value.trim(); //trim function removes the whitespace from both the ends.
  cityForm.reset;

  //Update the ui with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));
});

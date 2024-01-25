// TODO: add palestine not found joke

// TODO: favorite: when clicked make card appear always on top of list and saved to storage
// TODO: favorite: when clicked again remove from storage

// TODO: style page more
// TODO: make in card
// TODO: add wind speed km per h 
// TODO: add celsius symbol

// TODO: combine more api

// TODO: finish!!!

// TODO: when clicking 'enter' bar it will trigger the search button
// TODO: live search?
// TODO: if user typed something, recommend something close to what he typed like google search (do only if you have a lot of time XD)

const selectCountry = document.querySelector('.selectCountry');
let statesArray = JSON.parse(localStorage.getItem('statesArray')) || []; 

function loadItems () {
  statesArray.forEach(async stateItem => {
    try {
      const emptyOption = document.createElement('option');
      emptyOption.value = '';
      selectCountry.appendChild(emptyOption);
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=28a285c2eac8469daaa83623242301&q=${stateItem}&aqi=no`);
      if (response.ok) {
        const jsonNote = await response.json();
        createElements(jsonNote, stateItem);
      } else {
          console.log(`invalid API response, ${response.statusText}`);
      }
    } catch(error) {
        console.log(`an error occurred ${error}`);
    }
    });
}
async function fetchCountry () {
  const selectedOption = selectCountry.options[selectCountry.selectedIndex];
   try {
    if (selectedOption.innerText === 'Palestinian Territory, Occupied') {
      document.body.style.backgroundColor = 'red'
      const killHamas = document.createElement('h1');
      killHamas.className = 'killHamas';
      killHamas.innerText = 'KILL HAMAS!!!';
      document.body.appendChild(killHamas);
      return
    }
    // fetch city
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=28a285c2eac8469daaa83623242301&q=${selectedOption.innerText}&aqi=no`);
    if (!response.ok) {
      alert('State not found. please enter a valid state name');
      return;
    }
    const jsonNote = await response.json();
    // check if already in the list
    const isAlreadyInList = statesArray.some(state => state === selectedOption.innerText);
    if (isAlreadyInList) {
      alert('State is already in the list');
      return;
    }
    // add to local storage
    statesArray.push(selectedOption.innerText);
    localStorage.setItem('statesArray', JSON.stringify(statesArray));
    createElements(jsonNote, selectedOption.innerText);
  } catch(error) {
      console.log(`an error occurred: ${error}`);
  }
}
  
  function createElements(jsonNote, stateItem) {
    const allStatesContainer = document.querySelector('.allStatesContainer');
    // state container
    const stateContainer = document.createElement('div');
    stateContainer.className = 'stateContainer';
    allStatesContainer.appendChild(stateContainer);
    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn fa-solid fa-xmark';
    stateContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', (e) => {
      const item = e.target.parentElement;
      item.remove();
      statesArray = statesArray.filter((state) => state !== stateItem);
      localStorage.setItem('statesArray', JSON.stringify(statesArray));
    })
    // favorite button
/*     const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favoriteBtn fa-regular fa-heart';
    stateContainer.appendChild(favoriteBtn);
    favoriteBtn.addEventListener('click', () => {
      favoriteBtn.className = 'favoriteBtnClicked fa-solid fa-heart'
}) */
    // location
    const location = document.createElement('h3');
    location.innerHTML = `<strong>Location: </strong>${stateItem}, ${jsonNote.location.name}`;
    stateContainer.appendChild(location);
    // weather condition icon
    const icon = document.createElement('img');
    icon.src = jsonNote.current.condition.icon;
    stateContainer.appendChild(icon);
    // weather condition
    const condition = document.createElement('p');
    condition.innerHTML = `<strong>Condition: </strong>${jsonNote.current.condition.text}`;
    stateContainer.appendChild(condition);
    // humidity
    const humidity = document.createElement('p');
    humidity.innerHTML = `<strong>Humidity: </strong>${jsonNote.current.humidity}`;
    stateContainer.appendChild(humidity);
    // temperature
    const temperature = document.createElement('p');
    temperature.innerHTML = `<strong>Temperature(celcius): </strong>${jsonNote.current.temp_c}`;
    stateContainer.appendChild(temperature);
    // wind speed
    const windSpeed = document.createElement('p');
    windSpeed.innerHTML = `<strong>Wind speed: </strong>${jsonNote.current.wind_kph}`;
    stateContainer.appendChild(windSpeed);
}  

document.addEventListener('DOMContentLoaded', loadItems);
selectCountry.addEventListener('change', fetchCountry);
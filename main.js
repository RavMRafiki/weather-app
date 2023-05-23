const form = document.querySelector(".top-banner form");
const list = document.querySelector(".cities");
const input = form.querySelector("input");
const msg = document.querySelector(".top-banner .msg");
const apiKey = "e2eed64602cedfc5266605beca9dff06";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = ` 
<h2 class="city-name" data-name="${name},${sys.country}"> 
<span>${name}</span> 
<sup>${sys.country}</sup> 
</h2> 
<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup> 
</div> 
<figure> 
<img class="city-icon" src=${icon} alt=${weather[0]["main"]}> 
<figcaption>${weather[0]["description"]}</figcaption> 
</figure> 
`;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

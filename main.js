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
      const li = document.createElement("div");
      li.classList.add("city");
      li.classList.add("col");
      li.classList.add("m-3");

      const markup = ` <div class="card mx-auto" style="width: 18rem">
            <img
              src="${icon}"
              class="card-img-top city-icon"
              alt="${weather[0]}"
            />
            <div class="card-body bg-warning-subtle">
              <h5 class="card-title">${name} <sup>${sys.country}</sup></h5>
              <p class="card-text display-5">
                ${Math.round(main.temp)}<sup>°C</sup>
              </p>
            </div>
          </div> 
`;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.classList.remove("visually-hidden");
    });

  msg.classList.add("visually-hidden");
  form.reset();
  input.focus();
});

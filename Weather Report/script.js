const apiKey = "eac3e17f1f6c1d40080628124e161b4a";

function clearAnimation() {
  const animDiv = document.getElementById("weatherAnimation");
  animDiv.innerHTML = "";
}

function showAnimation(weatherType) {
  const animDiv = document.getElementById("weatherAnimation");
  clearAnimation();

  const type = weatherType.toLowerCase();

  if (type.includes("cloud")) {
    for (let i = 0; i < 3; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
      cloud.style.top = `${10 + i * 20}%`;
      animDiv.appendChild(cloud);
    }
  } else if (type.includes("clear")) {
    const sun = document.createElement("div");
    sun.classList.add("sun");
    animDiv.appendChild(sun);
  } else if (type.includes("rain") || type.includes("drizzle") || type.includes("thunderstorm")) {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.classList.add("raindrop");
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDelay = `${Math.random()}s`;
      animDiv.appendChild(drop);
    }
  } else if (type.includes("snow")) {
    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("div");
      flake.classList.add("snowflake");
      flake.style.left = `${Math.random() * 100}vw`;
      flake.style.animationDelay = `${Math.random() * 6}s`;
      animDiv.appendChild(flake);
    }
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherResult");

  if (!city) {
    weatherDiv.innerHTML = `<p>Please enter a city name.</p>`;
    weatherDiv.classList.remove("show");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon, main } = data.weather[0];
    const { speed } = data.wind;

    weatherDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
      <p><strong>${description}</strong></p>
      <p>🌡 Temperature: ${temp}°C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>💨 Wind Speed: ${speed} m/s</p>
    `;

    showAnimation(main);

    weatherDiv.classList.remove("show");
    void weatherDiv.offsetWidth;
    weatherDiv.classList.add("show");

  } catch (error) {
    weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    weatherDiv.classList.remove("show");
    clearAnimation();
  }
}

const data = JSON.parse(localStorage.getItem("data"));
console.log(data);
let lat;
let long;
let city;
let region;
let org;
let pincode;
let timezone;
let POSTOFFICE;
function renderdata(data) {
  ip = data.ip;
  lat = data.latitude;
  long = data.longitude;
  org = data.org;
  city = data.city;
  region = data.region;
  pincode = data.postal;
  timezone = data.timezone;
  const IP = document.getElementById("IP");
  IP.innerText = "IP Address: " + ip;
  const LAT = document.getElementById("lat");
  LAT.innerText = "Lat: " + lat;
  const LONG = document.getElementById("long");
  LONG.innerText = "Long: " + long;
  const CITY = document.getElementById("city");
  CITY.innerText = "City: " + city;
  const REGION = document.getElementById("region");
  REGION.innerText = "Region: " + region;
  const ORG = document.getElementById("org");
  ORG.innerText = "Org: " + org;
  const TIMEZONE = document.getElementById("timezone");
  TIMEZONE.innerText = "Timezone: " + timezone;
  const PINCODE = document.getElementById("pincode");
  PINCODE.innerText = "Pincode: " + pincode;
  showmap(lat, long);

  const continent = data.continent_code;
  const country = data.country;
  // showDateTime(timezone, continent, country.toLowerCase());
  showDateTime(timezone, continent, country);

  getpostOffice(pincode);
}
renderdata(data);

function showmap(lat, long) {
  const map = document.getElementsByTagName("iframe")[0];
  // console.log(map.src);
  map.src = `https://maps.google.com/maps?q=${lat}, ${long}&output=embed`;
}

function showDateTime(timezone, continent, country) {
  codeTime = country + "-" + continent;
  // console.log(codeTime);
  let dateTime = new Date().toLocaleString(codeTime, {
    timeZone: timezone,
  });
  // console.log(dateTime);
  // let chicago_datetime_str = new Date().toLocaleString("en-US", {
  //   timeZone: "America/Chicago",
  // });

  // // "3/22/2021, 5:05:51 PM"
  // console.log(chicago_datetime_str);

  const DATETIME = document.getElementById("datetime");
  DATETIME.innerText = "Date and Time: " + dateTime;
}

function getpostOffice(pincode) {
  async function fetchIPinfo() {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();
    const MESSAGE = document.getElementById("message");
    MESSAGE.innerText = " Message: " + data[0].Message;
    showcard(data[0].PostOffice);
  }
  fetchIPinfo();
}

function showcard(postOffice) {
  POSTOFFICE = postOffice;
  const grids = document.getElementsByClassName("grids")[0];

  for (let i = 0; i < postOffice.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    const name = document.createElement("div");
    name.innerText = "Name: " + postOffice[i].Name;
    card.appendChild(name);
    const branch = document.createElement("div");
    branch.innerText = "Branch Type: " + postOffice[i].BranchType;
    card.appendChild(branch);
    const delivery = document.createElement("div");
    delivery.innerText = "Delivery Status: " + postOffice[i].DeliveryStatus;
    card.appendChild(delivery);
    const distrinct = document.createElement("div");
    distrinct.innerText = "District: " + postOffice[i].District;
    card.appendChild(distrinct);
    const division = document.createElement("div");
    division.innerText = "Division: " + postOffice[i].Division;
    card.appendChild(division);
    grids.appendChild(card);
  }
}

const inbtn = document.getElementsByClassName("button")[0];
inbtn.addEventListener("click", (event) => {
  event.preventDefault();
  cleardata();
  // console.log(event.target);
  const input = document.getElementById("input");
  search(input.value);
});

function cleardata() {
  const card = document.getElementsByClassName("card");
  console.log(card);
  while (card.length > 0) {
    // console.log("removing");
    card[0].remove();
  }
}

function search(value) {
  console.log(value);
  const grids = document.getElementsByClassName("grids")[0];
  console.log(POSTOFFICE);
  for (let i = 0; i < POSTOFFICE.length; i++) {
    if (POSTOFFICE[i].Name == value || POSTOFFICE[i].BranchType == value) {
      const card = document.createElement("div");
      card.className = "card";
      const name = document.createElement("div");
      name.innerText = "Name: " + POSTOFFICE[i].Name;
      card.appendChild(name);
      const branch = document.createElement("div");
      branch.innerText = "Branch Type: " + POSTOFFICE[i].BranchType;
      card.appendChild(branch);
      const delivery = document.createElement("div");
      delivery.innerText = "Delivery Status: " + POSTOFFICE[i].DeliveryStatus;
      card.appendChild(delivery);
      const distrinct = document.createElement("div");
      distrinct.innerText = "District: " + POSTOFFICE[i].District;
      card.appendChild(distrinct);
      const division = document.createElement("div");
      division.innerText = "Division: " + POSTOFFICE[i].Division;
      card.appendChild(division);
      grids.appendChild(card);
    }
  }
}

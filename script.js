$.getJSON("https://api.ipify.org?format=json", function (data) {
  let a = data.ip;
  const ip = document.getElementById("ip");
  ip.innerText = a;
  localStorage.setItem("ipAdress", a);
});

const right2 = document.getElementsByClassName("right2")[0];
right2.addEventListener("click", async () => {
  console.log("next page");
  const ipAdress = localStorage.getItem("ipAdress");
  console.log(ipAdress);

  try {
    const response = await fetch(`https://ipapi.co/${ipAdress}/json/`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    // renderdata(data);

    setTimeout(() => {
      window.location.href = "postal.html";
    }, 2000);
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error, show a message to the user, or perform alternative actions.
  }
});

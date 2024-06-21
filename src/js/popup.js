const date = new Date();

const updateTime = () => {
  const timeEl = document.getElementById("time");
  const hours = date.getHours();
  const min = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${
    min < 10 ? "0" : ""
  }${min} ${ampm}`;

  timeEl.textContent = formattedTime;
};

const updateDate = () => {
  const dateEl = document.querySelector("#date");
  //   constr
};

// update time
updateTime();
setInterval(updateTime, 1000);

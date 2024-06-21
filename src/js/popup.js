const updateTime = () => {
  const date = new Date();
  const timeEl = document.getElementById("time");
  const hours = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec} ${ampm}`;

  timeEl.textContent = formattedTime;
};
const updateDate = () => {
  const date = new Date();
  const dateEl = document.getElementById("date");
  const currDate = date.getDate();
  const currMonth = date.getMonth() + 1;
  const currYear = date.getFullYear();
  const formattedDate = `${currDate}-${currMonth}-${currYear}`;
  dateEl.textContent = formattedDate;
};

const greetUser = () => {
  const greetingEl = document.getElementById("greeting");
  const currHour = new Date().getHours();
  const morning = 5; // 5:00 AM
  const afternoon = 12; // 12:00 PM
  const evening = 18; // 6:00 PM
  const night = 21; // 9:00 PM

  if (currHour >= morning && currHour < afternoon) {
    greetingEl.textContent = "Good Morning";
  } else if (currHour >= afternoon && currHour < evening) {
    greetingEl.textContent = "Good Afternoon";
  } else if (currHour >= evening && currHour < night) {
    greetingEl.textContent = "Good Evening";
  } else {
    greetingEl.textContent = "Good Night";
  }
};

updateTime();
updateDate();
greetUser();
setInterval(updateTime, 1000);

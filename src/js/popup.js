document.addEventListener("DOMContentLoaded", () => {
  const toggle12Hrs = document.querySelector(".btn-12Hrs");
  const toggle24Hrs = document.querySelector(".btn-24Hrs");
  const timeEl = document.getElementById("time");
  const timeElWithoutAmPm = document.getElementById("time-with-24hr");

  let db;
  let is12HourMode = false; // Default to 12-hour mode

  function initializeDB() {
    const request = indexedDB.open("ClockDb", 1);

    request.onupgradeneeded = function (event) {
      db = event.target.result;
      db.createObjectStore("settings", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      initializeSettingsFromDB(); // Initialize settings from IndexedDB
    };

    request.onerror = function (event) {
      console.error("IndexedDB error:", event.target.errorCode);
    };
  }

  const initializeSettingsFromDB = () => {
    const transaction = db.transaction(["settings"], "readonly");
    const store = transaction.objectStore("settings");
    const request = store.get(1);

    request.onsuccess = function (event) {
      const data = event.target.result;
      is12HourMode = data ? data.is12HourMode : true; // Default to true if not set
      updateTime();
    };

    request.onerror = (e) => {
      console.error("Error fetching data from IndexedDB:", e.target.error);
    };
  };

  // Function to update settings in IndexedDB
  const updateSettingsInDB = (is12HourMode) => {
    const transaction = db.transaction(["settings"], "readwrite");
    const store = transaction.objectStore("settings");

    // Assuming you have only one record, update it or add new
    const request = store.put({ id: 1, is12HourMode: is12HourMode });

    request.onerror = function (event) {
      console.error(
        "Error updating settings in IndexedDB:",
        event.target.error
      );
    };
  };

  // Function to update time display based on 12/24 hrs format
  const updateTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    if (is12HourMode) {
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTimeWithAmPm = `${hours % 12 || 12}:${
        min < 10 ? "0" + min : min
      }:${sec < 10 ? "0" + sec : sec} ${ampm}`;
      timeEl.textContent = formattedTimeWithAmPm;
      timeEl.style.display = "flex";
      timeElWithoutAmPm.style.display = "none";
    } else {
      const formattedTimeWithoutAmPm = `${hours}:${
        min < 10 ? "0" + min : min
      }:${sec < 10 ? "0" + sec : sec}`;
      timeElWithoutAmPm.textContent = formattedTimeWithoutAmPm;
      timeElWithoutAmPm.style.display = "flex";
      timeEl.style.display = "none";
    }
  };

  toggle12Hrs.addEventListener("click", () => {
    is12HourMode = true; // Set display mode to 12-hour
    updateSettingsInDB(is12HourMode); // Update settings in IndexedDB
    updateTime();
    chrome.storage.local.set({ is12HourMode: true }); // Update Chrome storage
  });

  toggle24Hrs.addEventListener("click", () => {
    is12HourMode = false; // Set display mode to 24-hour
    updateSettingsInDB(is12HourMode); // Update settings in IndexedDB
    updateTime();
    chrome.storage.local.set({ is12HourMode: false }); // Update Chrome storage
  });

  initializeDB();
  setInterval(updateTime, 1000); // Update time every second

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

  updateDate();
  greetUser();
});

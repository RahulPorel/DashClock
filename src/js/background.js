const updateIconTime = (is12HourMode) => {
  try {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedTime = is12HourMode
      ? `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes}`
      : `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

    chrome.action.setBadgeText({ text: formattedTime });
    chrome.action.setBadgeBackgroundColor({ color: "white" });
    chrome.action.setBadgeTextColor({ color: "black" });
  } catch (error) {
    console.error("Error updating icon time:", error);
  }
};


const getTimeFormatFromStorage = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["is12HourMode"], (result) => {
      resolve(result.is12HourMode !== undefined ? result.is12HourMode : true); // Default to 12-hour mode
    });
  });
};

chrome.alarms.create("updateTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "updateTime") {
    const is12HourMode = await getTimeFormatFromStorage();
    updateIconTime(is12HourMode);
  }
});

(async () => {
  const is12HourMode = await getTimeFormatFromStorage();
  updateIconTime(is12HourMode);
})();

// Listen for changes to the time format setting
chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName === "local" && changes.is12HourMode) {
    const is12HourMode = changes.is12HourMode.newValue;
    updateIconTime(is12HourMode);
  }
});

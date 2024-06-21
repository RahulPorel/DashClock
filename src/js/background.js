const updateIconTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  chrome.action.setBadgeText({ text: formattedTime });
  chrome.action.setBadgeBackgroundColor({ color: "white" });
  chrome.action.setBadgeTextColor({ color: "black" });
};

// Update the badge text every minute
chrome.alarms.create("updateTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(updateIconTime);


function takescreenshot(){ 
   chrome.extension.getBackgroundPage().console.log('foo');
   chrome.alarms.create("1st", {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
  chrome.alarms.create("2nd", {
    delayInMinutes: 1.25,
    periodInMinutes: 1.25
  });
  chrome.alarms.create("3rd", {
    delayInMinutes: 1.50,
    periodInMinutes: 1.50
  });
  chrome.alarms.create("4th", {
    delayInMinutes: 1.75,
    periodInMinutes: 1.75
  });
  
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "1st" || alarm.name === "2nd" || alarm.name === "3rd" || alarm.name === "4th") {
    chrome.tabs.captureVisibleTab((screenshotUrl) => 
 {
  //  alert(screenshotUrl);
   fetch("http://43.204.11.138:5000/image", {
    method: "POST",
    body: JSON.stringify({ Image:screenshotUrl.slice(23,screenshotUrl.length) }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  }).then(response => response.json()).then(json => chrome.extension.getBackgroundPage().console.log(json));
  }
);
  }

});
   
}

document.getElementById('on').addEventListener('click',function(event){
      takescreenshot();
 });

 document.getElementById('off').addEventListener('click',function(){
  chrome.alarms.clear("1st").then((e)=>{
    chrome.extension.getBackgroundPage().console.log(e);
  });
  chrome.alarms.clear("2nd").then((e)=>{
    chrome.extension.getBackgroundPage().console.log(e);
  });
  chrome.alarms.clear("3rd").then((e)=>{
    chrome.extension.getBackgroundPage().console.log(e);
  });
  chrome.alarms.clear("4th").then((e)=>{
    chrome.extension.getBackgroundPage().console.log(e);
  });
});
  
  // chrome.tabs.captureVisibleTab((screenshotUrl) => {
  //   const viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
  //   let targetId = null;
  //   alert(screenshotUrl);
  //   var xhr = new XMLHttpRequest();
  //     xhr.open("POST", "http://ec2-43-204-11-138.ap-south-1.compute.amazonaws.com:5000/image", true);
  //     xhr.setRequestHeader('Content-Type', 'application/json');

      
  //     xhr.send(JSON.stringify({ Image:screenshotUrl.slice(23,screenshotUrl.length) }));
    
  //   // chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
  //   //   // We are waiting for the tab we opened to finish loading.
  //   //   // Check that the tab's id matches the tab we opened,
  //   //   // and that the tab is done loading.
  //   //   if (tabId != targetId || changedProps.status != "complete"){
  //   //     return;
  //   //   }
  //   //   // As we cleared the check above, There is nothing we need to do for
  //   //   // future onUpdated events, so we use removeListner to stop getting called
  //   //   // when onUpdated events fire.
  //   //   chrome.tabs.onUpdated.removeListener(listener);

  //   //   // We fetch all the views opened by our extension using getViews method and
  //   //   // it returns an array of the JavaScript 'window' objects for each of the pages
  //   //   // running inside the current extension. Inside the loop, we match each and
  //   //   // every entry's URL to the unique URL we created at the top and if we get a match,
  //   //   // we call a function on that view which will be called on the page that has been opened
  //   //   // by our extension and we pass our image URL to the page so that it can display it to the user.
  //   //   var views = chrome.extension.getViews();
     
  //   //   for (var i = 0; i < views.length; i++) {
  //   //     var view = views[i];
  //   //     if (view.location.href == viewTabUrl) {
  //   //       view.setScreenshotUrl(screenshotUrl);
  //   //       break;
  //   //     }
  //   //   }
  //   // });

  //   // //We open the tab URL by using the chrome tabs create method and passing it the
  //   // // URL that we just created and we save the tab id that we get from this method
  //   // // after the tab is created in the targetId variable.
  //   // chrome.tabs.create({url: viewTabUrl}, (tab) => {
  //   //   targetId = tab.id;
  //   // });
  // });


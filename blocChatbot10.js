//Copyright © 2023 Bloc. All rights reserved.

var OPENED = false;
var COLOR_THEME = "light";


function embedBlocChatBot() {
    window.addEventListener("message", receiveMessage, false);
      async function receiveMessage(event) {
        var parameter = await event.data;
        // if (typeof parameter === "object" && parameter !== null) {
        //   parameter = JSON.stringify(parameter);
        // }
    
        if(parameter.payload.isDark === true){
            COLOR_THEME = "dark";
        }
        else{
            COLOR_THEME = "light";
        }
        // console.log("parameter", parameter);
        // console.log("parameter value", parameter.payload);
      }
      
    if(window.blocConfig?.embedSuccess) return;

  const blocId = window.blocConfig?.blocId;
  console.log("blocId", blocId);

  const blocBot = document.createElement("div");
  blocBot.setAttribute("id", "bloc-bot");
  blocBot.style.position = "fixed";
  blocBot.style.bottom = "1rem";
  blocBot.style.right = "1rem";
  blocBot.style.width = "50px";
  blocBot.style.height = "50px";
  blocBot.style.borderRadius = "100%";
  blocBot.style.backgroundColor = "#292929";
  blocBot.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
  blocBot.style.cursor = "pointer";
  blocBot.style.zIndex = 999999998;
  blocBot.style.transition = "all 0.3s ease-in-out";

  const popUpMessage = document.createElement("div");
  popUpMessage.setAttribute("id", "pop-up-message");
  popUpMessage.style.position = "fixed";
  popUpMessage.style.bottom = "67px";
  popUpMessage.style.right = "62px";
  popUpMessage.style.maxWidth = "268px"
  popUpMessage.style.borderRadius = "10px";
  popUpMessage.style.fontFamily = "Arial, Helvetica, sans-serif";
  popUpMessage.style.fontSize = "14px";
  popUpMessage.style.zIndex = 999999997;
  popUpMessage.style.cursor = "pointer";
  popUpMessage.style.flexDirection = "column";
  popUpMessage.style.gap = "30px";
  popUpMessage.style.display = "none";
  popUpMessage.style.rotate = "10deg";
  popUpMessage.style.scale = "0.1";
  popUpMessage.style.transition = "all 0.3s ease-in-out";
  popUpMessage.style.transformOrigin = "bottom right";

  const popUpMessageClose = document.createElement("div");
  popUpMessageClose.innerHTML = "&#10005;";
  popUpMessageClose.style.position = "absolute";
  popUpMessageClose.style.top = "-3px";
  popUpMessageClose.style.right = "-3px";
  popUpMessageClose.style.fontWeight = "bold";
  popUpMessageClose.style.display = "none";
  popUpMessageClose.style.justifyContent = "center";
  popUpMessageClose.style.alignItems = "center";
  popUpMessageClose.style.zIndex = 999999998;
  popUpMessageClose.style.width = "22px";
  popUpMessageClose.style.height = "22px";
  popUpMessageClose.style.borderRadius = "50%";
  popUpMessageClose.style.textAlign = "center";
  popUpMessageClose.style.fontSize = "12px";
  popUpMessageClose.style.cursor = "pointer";

  popUpMessage.appendChild(popUpMessageClose);
  document.body.appendChild(popUpMessage);

  blocBot.addEventListener('mouseenter', (event) => {
    blocBot.style.transform = "scale(1.08)";
  })
  blocBot.addEventListener('mouseleave', (event) => {
    blocBot.style.transform = "scale(1)";
  })

  const blocBotIcon = document.createElement("div");

  blocBotIcon.style.display = "flex";
    blocBotIcon.style.justifyContent = "center";
    blocBotIcon.style.alignItems = "center";
    blocBotIcon.style.width = "100%";
    blocBotIcon.style.height = "100%";
    blocBotIcon.style.zIndex = 999999999;
    blocBotIcon.innerHTML = getBlocIcon();

    blocBot.appendChild(blocBotIcon);

    blocBot.addEventListener('click', ()=>{
        if(iframe.style.display === 'none'){
            OPENED = true;
            popUpMessage.style.display = "none";
            iframe.style.display = 'flex';
            blocBotIcon.innerHTML = getCloseIcon();
            iframe.contentWindow.postMessage({ type: "open" }, "*");
        }
        else{
            iframe.style.display = 'none';
            blocBotIcon.innerHTML = getBlocIcon();
            iframe.contentWindow.postMessage({ type: "close" }, "*");
        }
    })

    popUpMessage.addEventListener('click', ()=>{
        OPENED = true;
        popUpMessage.style.display = "none";
        iframe.style.display = 'flex';
        blocBotIcon.innerHTML = getCloseIcon();
    });

    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:3001/bloc/${blocId}`;
    iframe.setAttribute("id", "bloc-iframe");
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.flexDirection = "column";
    iframe.style.justifyContent = "space-between";
    iframe.style.boxShadow = "rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px";
    iframe.style.bottom = "80px";
  iframe.style.right = "1rem";
  iframe.style.width = window.innerWidth < 640 ? "90%" : "335px";
  iframe.style.height = "85vh";
  iframe.style.borderRadius = "0.75rem";
  iframe.style.display = "none";

  iframe.style.zIndex = 999999999;
  iframe.style.overflow = "hidden";

  document.body.appendChild(iframe);

  const getFloatingMessage = () => {
    const theme = COLOR_THEME;
    console.log("theme", theme);
    // console.log(receiveMessage());

    const messageContainer = document.createElement("div");
    messageContainer.style.display = "flex";
    messageContainer.style.justifyContent = "flex-end";

    const messageEle = document.createElement("div");
    messageEle.style.backgroundColor = "rgb(102 102 102)";
    messageEle.style.color = "#ffffff";
    messageEle.style.boxShadow =
        "rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px";
    messageEle.style.borderTopLeftRadius = "8px";
    messageEle.style.borderTopRightRadius = "8px";
    messageEle.style.borderBottomLeftRadius = "8px";
    messageEle.style.padding = "8px 13px";
    messageEle.style.margin = "8px";
    messageEle.style.fontSize = "14px";
    messageEle.innerText = `Hey there! How can i help you? I am a AI Chatbot Powered By Bloc.`;
    messageEle.style.opacity = 0;
  
    messageEle.style.transform = "scale(0.9)";
    messageEle.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";

    messageContainer.appendChild(messageEle);
    popUpMessage.appendChild(messageContainer);

    setTimeout(() => {
        popUpMessage.style.display = "block";
    }
    , 4000);

    setTimeout(() => {
        popUpMessage.style.scale = "1";
    }, 4100);
    
    setTimeout(() => {
        popUpMessage.style.bottom = "48px";
        popUpMessage.style.rotate = "0deg";
        messageEle.style.opacity = 1;
        messageEle.style.transform = "scale(1)";
    }, 4400);

    popUpMessageClose.style.backgroundColor = theme === "light" ? "#fff" : "#000";
    popUpMessageClose.style.color = theme === "light" ? "#000" : "#fff";
    popUpMessageClose.style.boxShadow = theme === "light" ? "rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px" : "rgba(0, 0, 0, 0.2) 0px 10px 30px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px";

    popUpMessage.addEventListener("mouseenter", () => {
        popUpMessageClose.style.display = "flex";    
    });

    popUpMessage.addEventListener("mouseleave", () => {
        popUpMessageClose.style.display = "none";
    });

    popUpMessageClose.addEventListener("click", () => {
        popUpMessage.style.display = "none";
    });
  };

    function getBlocIcon() {
        const CHAT_BUTTON_ICON = `http://localhost:3001/bloc_logo.svg`;
        const imageEleOpen = `<img src="${CHAT_BUTTON_ICON}" width="45%" height="45%" />`
    
        return imageEleOpen; // return USER_ADDED_CHAT_ICON
      }
    
      function getCloseIcon() {
        const CHAT_BUTTON_CLOSE = `http://localhost:3001/down.svg`;

        const imageEle = `<img src="${CHAT_BUTTON_CLOSE}" width="38%" height="38%" />`
        return imageEle;
      }

      document.body.appendChild(blocBot);
      getFloatingMessage();

      iframe.onload = () => {
        iframe.contentWindow.postMessage(
          { windowInnerWidth: window.innerWidth },
          "*"
        );
      };
    
      if (window.blocConfig) window.blocConfig.embedSuccess = true;
}

if (document.readyState === "complete") {
    embedBlocChatBot();
  } else {
    window.addEventListener("load", embedBlocChatBot());
  }


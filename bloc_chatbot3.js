var OPENED = false;

function embedBlocChatBot() {
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
  popUpMessage.style.bottom = "80px";
  popUpMessage.style.borderRadius = "10px";
  popUpMessage.style.fontFamily = "Arial, Helvetica, sans-serif";
  popUpMessage.style.fontSize = "14px";
  popUpMessage.style.zIndex = 999999997;
  popUpMessage.style.cursor = "pointer";
  popUpMessage.style.flexDirection = "column";
  popUpMessage.style.gap = "30px";
  popUpMessage.style.display = "none";

  const popUpMessageClose = document.createElement("div");
  popUpMessageClose.innerHTML = "&#10005;";
  popUpMessageClose.style.position = "absolute";
  popUpMessageClose.style.top = "-7px";
  popUpMessageClose.style.right = "-7px";
  popUpMessageClose.style.fontWeight = "bold";
  popUpMessageClose.style.display = "none";
  popUpMessageClose.style.justifyContent = "center";
  popUpMessageClose.style.alignItems = "center";
  popUpMessageClose.style.zIndex = 999999996;
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
    iframe.src = `https://embed.askbloc.ai/bloc/${blocId}`;
    iframe.setAttribute("id", "bloc-iframe");
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.flexDirection = "column";
    iframe.style.justifyContent = "space-between";
    iframe.style.boxShadow = "rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px";
    iframe.style.bottom = "80px";
  iframe.style.right = "1rem";
  iframe.style.width = window.innerWidth < 640 ? "90%" : "458px";
  iframe.style.height = "85vh";
  iframe.style.borderRadius = "0.75rem";
  iframe.style.display = "none";

  iframe.style.zIndex = 999999999;
  iframe.style.overflow = "hidden";

  document.body.appendChild(iframe);

    function getBlocIcon() {
        const CHAT_BUTTON_ICON = `https://embed.askbloc.ai/bloc_logo.svg`;
    
        return CHAT_BUTTON_ICON; // return USER_ADDED_CHAT_ICON
      }
    
      function getCloseIcon() {
        const CHAT_BUTTON_CLOSE = `
      <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="${ICON_COLOR}" width="24" height="24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
      `;
        return CHAT_BUTTON_CLOSE;
      }

      document.body.appendChild(blocBot);

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

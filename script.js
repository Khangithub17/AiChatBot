let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB1oELTGZkhcTjbm-UcSorzzuuriCLb4AE";

function createChatBox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function getApiResponse(aiChatBox) {
  let textElement = aiChatBox.querySelector(".text");
  try{
    const response=await fetch(api_Url,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        contents:[{
          "role": "user",
          "parts":[{text:`${userMessage} in 10 words`}]
        }]
      })
    })
    let data = await response.json();
    const apiResponse=data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText = apiResponse;
    aiChatBox.querySelector(".text").innerText = apiResponse;
  } catch (error) {
    console.error(error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}

function showLoading() {
  let html = `
    <div class="img">
      <img src="ai.png" alt="" width="50px"/>
    </div>
    <p class="text"></p>
    <img class="loading" src="loading.gif" alt="loading" height="50">
  `;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);
  getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
  userMessage = prompt.value;
  if (!userMessage == "") {
    container.style.display = "flex";
  }{
    container.style.display = "none";
  }
  if (!userMessage) return;
  let html = `
    <div class="img">
      <img src="user.png" alt="" width="50px"/>
    </div>
    <p class="text"></p>
  `;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});

const view = {}
view.setActiveScreen = (screenName) => {
  switch(screenName) {
    case 'welcomeScreen':
      document.getElementById('app').innerHTML 
      = components.welcomPage
    break
    case 'registerPage':
      document.getElementById('app').innerHTML
      = components.registerPage
      document.getElementById('redirect-login')
      .addEventListener('click', () => {
        view.setActiveScreen('loginPage')
      })
      const registerForm = document.getElementById('register-form')
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const dataRegister = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value

        }
        console.log(dataRegister)
        controller.register(dataRegister)
      })
    break
    case 'loginPage':
      document.getElementById('app').innerHTML
      = components.loginPage
      document.getElementById('redirect-register')
      .addEventListener('click', () => {
        view.setActiveScreen('registerPage')
      })
      const loginForm = document.getElementById('login-form')
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const dataLogin = {
          email: loginForm.email.value,
          password: loginForm.password.value
        }
       
        controller.login(dataLogin)
      })
    break
    
    case 'chatPage':
      document.getElementById('app').innerHTML = components.chatPage
      const sendMessageForm = document.getElementById('send-message-form')
        sendMessageForm.addEventListener('submit', (event) => {
          event.preventDefault()
          const message = sendMessageForm.message.value
          // console.log(message);
          const messageSend = {
            owner: model.currentUser.email,
            content: message,
            createdAt: new Date().toISOString()
          }
          if (message.trim() !="") {
            model.addMessage(messageSend)
            sendMessageForm.message.value = ''
          } 
        })
        // lay cac cuoc hoi thoai ve
        model.getConversations()
        // lang nghe thay doi cua cac cuoc hoi thoai
        model.listenConversationsChange()
      break
    }
  }
    


view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message
}
view.addMessage = (message) => {
  const messageWrapper = document.createElement('div')
  messageWrapper.classList.add('message')
  if(model.currentUser.email === message.owner) {
    messageWrapper.classList.add('message-mine')
    messageWrapper.innerHTML = `<div class="message-content">${message.content}</div>`
  } else {
    messageWrapper.classList.add('message-other')
    messageWrapper.innerHTML = 
    `<div class="owner">${message.owner}</div>
    <div class="message-content">${message.content}</div> `
  }
  document.querySelector('.list-messages').appendChild(messageWrapper)
}
view.showCurrentConversation = () =>{
  
  document.querySelector('.conversation-title').innerHTML = model.currentConversation.title
  for(const oneMessage of model.currentConversation.listmessage){
    view.addMessage(oneMessage)
  }
}
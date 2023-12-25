const socket = io('/');

let name_;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area');

do{
    name_ = prompt('Please enter your name');
}while(!name_);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
}); 


function sendMessage(message){
    let msg = {
        user : name_,
        message : message.trim()
    };

    appendMessage(msg,'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send to server 
    socket.emit('message',msg);
};


function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markUp;
    messagearea.appendChild(mainDiv);
}

// receive msg

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
});

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}
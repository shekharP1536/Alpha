var url = "http://localhost:11434/api/generate";
var data = {
    "model" : "llama3",
    "stream" : false
};
function sendrequest(input) { 
    data.prompt = input; // update the prompt with the input value
    $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            var message = response.response;
            createChatStructure_model("phi",message);
        }
    });
}
$("#user_prompt").keydown(function (e) { 
    if(e.keyCode == 13) {
        exceute();
        console.log('ex');
    }
});
$("#input_send_sumbit").click(function (e) {
    exceute();    
});
function exceute(){
    var input = $("#user_prompt").val();
    console.log(input);
    console.log('request as sended');
    sendrequest(input);
    createUserPromptStructure("shekhar" , input);
    $("#user_prompt").val('');
    $("#user_prompt").focus();
}
function createChatStructure_model(model,message) {
    // Create elements
    var modelResponseContainerHolder = document.createElement('div');
    var modelResponseContainer = document.createElement('div');
    var modelNameHolder = document.createElement('span');
    var modelResponse = document.createElement('div');
    var promptHolderMessage = document.createElement('span');
    var modelOtherDetails = document.createElement('div');
    var responseTime = document.createElement('span');

    // Set classes
    modelResponseContainerHolder.className = 'model_response_container_holder';
    modelResponseContainer.className = 'model_response_container';
    modelNameHolder.className = 'model_name_holder';
    modelResponse.className = 'model_response';
    promptHolderMessage.className = 'promt_holder_message';
    modelOtherDetails.className = 'model_other_details';
    responseTime.className = 'response_time';

    // Set IDs
    promptHolderMessage.id = 'prompt_message';

    // Set text content
    modelNameHolder.textContent = model;
    promptHolderMessage.textContent = message;
    responseTime.textContent = new Date().toLocaleTimeString(); // Current time

    // Append children
    modelResponse.appendChild(promptHolderMessage);
    modelOtherDetails.appendChild(responseTime);
    modelResponseContainer.appendChild(modelNameHolder);
    modelResponseContainer.appendChild(modelResponse);
    modelResponseContainer.appendChild(modelOtherDetails);
    modelResponseContainerHolder.appendChild(modelResponseContainer);

    // Append to chat_container_div
    var chatContainerDiv = document.getElementById('chat_container_div');
    chatContainerDiv.appendChild(modelResponseContainerHolder);
}

function createUserPromptStructure(user_name, message) {
    // Create elements
    var userPromptContainerHolder = document.createElement('div');
    var userPromptContainer = document.createElement('div');
    var userNameHolder = document.createElement('span');
    var userPrompt = document.createElement('div');
    var userPromptSpan = document.createElement('span');
    var userPromptOtherDetails = document.createElement('div');
    var userPromptTime = document.createElement('span');

    // Set classes
    userPromptContainerHolder.className = 'user_prompt_container_holder';
    userPromptContainer.className = 'user_prompt_container';
    userNameHolder.className = 'user_name_holder';
    userPrompt.className = 'user_prompt';
    userPromptOtherDetails.className = 'user_prompt_other_details';
    userPromptTime.className = 'user_prompt_time';

    // Set text content
    userNameHolder.textContent = user_name;
    userPromptSpan.textContent = message;
    userPromptTime.textContent = new Date().toLocaleTimeString(); // Current time

    // Append children
    userPrompt.appendChild(userPromptSpan);
    userPromptOtherDetails.appendChild(userPromptTime);
    userPromptContainer.appendChild(userNameHolder);
    userPromptContainer.appendChild(userPrompt);
    userPromptContainer.appendChild(userPromptOtherDetails);
    userPromptContainerHolder.appendChild(userPromptContainer);

    // Append to user_prompt_container_div
    var userPromptContainerDiv = document.getElementById('chat_container_div');
    userPromptContainerDiv.appendChild(userPromptContainerHolder);
}


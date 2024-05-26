$(document).ready(function () {
    fetch_modal_list();
    fetch_modal_chat()
});
var data = {
    "model" : "llama2",
    "stream" : false
};

function  givechat_request(model){
    $(".section_a_chats").click(function (e) { 
        this.jqaa
        
    });
}
function sendrequest(input) { 
    var url = "http://localhost:11434/api/generate";
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

$("#modal_fetch_btn").click(function (e) { 
    e.preventDefault();
    fetch_modal_list();
});

fetch_modal_list = () =>  {
    var url = "http://localhost:11434/api/tags";
    $.ajax({
        type: "get",
        url: url,
        data: "",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#list_org_container").html("");
            response.models.forEach(model => {
                console.log(model.name);
                list_modal_list(model.name);
              });
        }
    });
}
function list_modal_list(value){
    console.log(value);
        var list_container = document.getElementById('list_org_container');
        // list_container.innerHTML = "";
        var new_div = document.createElement("div");
        var new_span = document.createElement("span");
        var details_btn = document.createElement("button");
        var delete_btn = document.createElement("button");

        new_div.className = "modal_list_div";
        new_span.className = "modal_name_span";
        details_btn.className = "modal_details_list_btn";
        delete_btn.className = "modal_delete_list_btn ";

        details_btn.innerHTML = '<i class="fa-solid fa-info"></i>';
        delete_btn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        delete_btn.title = "Delete";
        details_btn.title = "Details";


        new_span.innerText = value;

        new_div.appendChild(new_span);
        new_div.appendChild(details_btn);
        new_div.appendChild(delete_btn);
        list_container.appendChild(new_div);
}
$("#pull_model_name_btn").click(function (e) {
    var model_name = $("#model_pull_name").val();
    console.log(model_name);
    // pull_model(model_name);
});

// function pull_model(model_name){
//     var name_list =  {
//         "name" : model_name,
//         "insecure" : true,
//         "stream" : true
//     };
//     $.ajax({
//         type: "post",
//         url: "http://localhost:11434/api/pull",
//         data: JSON.stringify(name_list),
//         contentType: "application/json",
//         dataType: "json",
//         xhr: function() {
//             var xhr = new window.XMLHttpRequest();
//             xhr.addEventListener('progress', function(evt) {
//                 if (evt.lengthComputable) {
//                     var percentComplete = evt.loaded / evt.total;
//                     console.log('Progress: ' + Math.round(percentComplete * 100) + '%');
//                 }
//             });
//             return xhr;
//         },
//         success: function (response) {
//             console.log(response);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.log(textStatus, errorThrown);
//         }
//     });
// }
function fetch_modal_chat(){
    var url = "http://localhost:11434/api/tags";
    $.ajax({
        type: "get",
        url: url,
        data: "",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#section_a_chats_holder").html("");
            response.models.forEach(model => {
                console.log(model.name);
                model_chat_list(model.name , model.size);
              });
        }
    });
}
function model_chat_list(modal_name , model_size){
    a_size = model_size / 1000000000;
    var round_size = Math.round(a_size *100)/100;
    var continaer_of_all = document.getElementById('section_a_chats_holder');
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var span = document.createElement("span");
    var span1 = document.createElement("span");
    var div2 = document.createElement("div");
    var span2 = document.createElement("span");

    div.className = "section_a_chats";
    div1.className = "chat_title";
    div2.className = "chat_model_status";

    span.className = "chat_model_title";
    span1.className = "time_of-active";
    span2.className = "status_icons";

    span.innerText = modal_name;
    span1.innerText = round_size  + " GB";
    span2.innerHTML = '<i class="fa-solid fa-circle model_status_active"></i> Downloaded';


    div1.appendChild(span);
    div1.appendChild(span1);
    div2.appendChild(span2);
    div.appendChild(div1);
    div.appendChild(div2);
    continaer_of_all.append(div);

}
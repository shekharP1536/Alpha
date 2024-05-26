$(document).ready(function () {
    fetch_modal_list();
    fetch_modal_chat();
    showinputfield();
});
var data = {
    "model" : "llama2",
    "stream" : false
};
$(".section_a_chats").click(function (e) {
    console.log('executed here...');
    // var models = this.attr('model_text');
    console.log('exe');
});
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
            createChatStructure_model("llama2",message);
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
        var icon_div = document.createElement("div")
        var details_btn = document.createElement("button");
        var delete_btn = document.createElement("button");

        new_div.className = "modal_list_div";
        icon_div.className = "icon_contianer";
        new_span.className = "modal_name_span";
        details_btn.className = "modal_details_list_btn";
        delete_btn.className = "modal_delete_list_btn ";

        details_btn.innerHTML = '<i class="fa-solid fa-info"></i>';
        delete_btn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        delete_btn.title = "Delete";
        details_btn.title = "Details";


        new_span.innerText = value;

        new_div.appendChild(new_span);
        new_div.appendChild(icon_div);
        icon_div.appendChild(details_btn);
        icon_div.appendChild(delete_btn);
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
function  fetch_modal_chat(){
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
    var model_text = modal_name;
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
    span.id = "model_title_pass";
    span.innerText = modal_name;
    span.setAttribute("model_name" , model_text);
    span.setAttribute("model_size" , round_size);
    div.setAttribute("model_name" , model_text);
    div.setAttribute("model_size" , round_size);
    span1.innerText = round_size  + " GB";
    span2.innerHTML = '<i class="fa-solid fa-circle model_status_active"></i> Downloaded';
    div1.appendChild(span);
    div1.appendChild(span1);
    div2.appendChild(span2);
    div.appendChild(div1);
    div.appendChild(div2);
    continaer_of_all.append(div);

    // var created_ele = document.getElementsByClassName('section_a_chats');

    // for (let i = 0; i < created_ele.length; i++) {
    //     const element = created_ele[i];
    //     var arr = $(element).attr("model_name");
    //     element.addEventListener('click' , givechat_request(arr));  
    // }

}
function start_chat(model , status , size){
    var parent_div = document.getElementById("section_b");
    var chat_header_section = document.createElement("div");
    var section_b_chat_title_holder_container = document.createElement("div");
    var _section_b_chat_title_container = document.createElement("div");
    var chat_model_name_curently_active = document.createElement("div");
    var chat_model_name = document.createElement("div");
    var chat_model_brief_status = document.createElement("div");
    var chat_model_name_brief_container = document.createElement("div");
    var span = document.createElement("span");
    var spana = document.createElement("span");
    var spanb = document.createElement("span");
    spana.className = "status_icons";
    span.innerText = model;
    spanb.innerText = status;
    var chat_container = document.createElement("div");
    chat_header_section.className = "chat_header_section";
    section_b_chat_title_holder_container.className = "section_b_chat_title_holder_container";
    _section_b_chat_title_container.className = "_section_b_chat_title_container";
    chat_model_name_curently_active.className = "chat_model_name_curently_active";
    chat_model_name.className = "chat_model_name";
    chat_model_brief_status.className = "chat_model_brief_status";
    chat_model_name_brief_container.className = "chat_model_name-brief_container";
    chat_container.className = "chat_container";

    chat_container.id = "chat_container_div";

    // var chat_input_container = document.createElement("div");
    // var user_prompt_input = document.createElement("div");
    // var input_mic_container = document.createElement("div");
    // var input_mic_container_a = document.createElement("div");
    // var input_send_submit = document.createElement("div");    
    // var input = document.createElement("input");
    // input.className = "input_prompt_input";
    // input.id = "user_prompt";
    // input.name = "prompt";
    // input.placeholder = "Message here...";
    // chat_input_container.className("chat_input_container");
    // user_prompt_input.className("user_prompt_input");
    // input_mic_container.className("input_mic_container");
    // input_mic_container_a.className("input_mic_container_a");
    // input_send_submit.className("input_send_submit");
    span.innerText = model;
    spana.innerHTML = '<i class="fa-solid fa-circle model_status_active"></i>';
    spanb.innerText = status;
    chat_model_brief_status.appendChild(spanb);
    chat_model_brief_status.appendChild(spana);
    chat_model_name_curently_active.appendChild(chat_model_brief_status);
    chat_model_name.appendChild(span);
    chat_model_name_curently_active.appendChild(chat_model_name);
    _section_b_chat_title_container.appendChild(chat_model_name_curently_active);
    _section_b_chat_title_container.appendChild(chat_model_name_brief_container);
    section_b_chat_title_holder_container.appendChild(_section_b_chat_title_container);
    chat_header_section.appendChild(section_b_chat_title_holder_container);
    parent_div.appendChild(chat_header_section);
    parent_div.appendChild(chat_container);
    showinputfield();
}
function showinputfield(model, message){
    var input_field = document.getElementById('chat_container_div');
    if (input_field.style.display == 'flex') {
        console.log('no');
        input_field.style.display = 'none';
    } else {
        input_field.style.display = 'flex';
        console.log('yes');
    }
}
function _list_newchat_model_select(){
    var url = "http://localhost:11434/api/tags";
    $.ajax({
        type: "get",
        url: url,
        data: "",
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            $("#model_list_newchat").html("");
            response.models.forEach(model => {
                _list_newchat_model(model.name , model.size);
              });
        }
    });
}
function _list_newchat_model(model , size){
    var container_off_all = document.getElementById('model_list_newchat');
    var option = document.createElement('option');
    option.innerText = model;
    option.setAttribute("value", model);
    container_off_all.appendChild(option);
    //new element to hold all list  
}
$('#start_newchat_go').click(function () {
    var model_selector = document.getElementById('model_list_newchat');
    var selected = model_selector.options[model_selector.selectedIndex].text;
    console.log(selected);
});

var edit_btns = document.querySelectorAll(".edit_button");
var add_btns = document.querySelectorAll(".add_button");
edit_btns.forEach(edit_btn => {
    edit_btn.addEventListener('click', e => {
        var formId = edit_btn.classList.item(1);
        var tableId = edit_btn.classList.item(2);
        var targetForm = document.getElementById(formId);
        var targetTable = document.getElementById(tableId);
        var link = "/admin/" + formId.slice(0, -5) + "/update";

        displayForm(targetForm, targetTable);
        changeLink(targetForm, link);
        getData(edit_btn.value, targetForm);
    })
})

add_btns.forEach(add_btn => {
    add_btn.addEventListener('click', e => {
        var formId = add_btn.classList.item(1);
        var tableId = add_btn.classList.item(2);
        var targetForm = document.getElementById(formId);
        var targetTable = document.getElementById(tableId);
        var link = "/admin/" + formId.slice(0, -5) + "/new";
        var img_frame = document.querySelector('div#' + formId + " div#img_frame");

        displayForm(targetForm, targetTable);
        changeLink(targetForm, link);
        clearData(targetForm, img_frame);
    })
})

function changeLink(targetForm, link){
    targetForm.querySelector(".insert_form").action = link;
}

function displayForm(targetForm, targetTable){
    targetForm.classList.add("display");
    targetTable.classList.remove("display");

    var back_btn = targetForm.querySelector('.back_button');
    back_btn.addEventListener('click', e => {
        closeForm(targetForm, targetTable);
    });
}

function closeForm(targetForm, targetTable){
    targetForm.classList.remove("display");
    targetTable.classList.add("display");

    edit_btns = targetTable.querySelectorAll(".edit_button");
    edit_btns.forEach(edit_btn => {
        edit_btn.addEventListener('click', e => {
            var formId = edit_btn.classList.item(1);
            var tableId = edit_btn.classList.item(2);
            var targetForm = document.getElementById(formId);
            var targetTable = document.getElementById(tableId);
    
            displayForm(targetForm, targetTable);
        })
    })
}

function getData(dataId, targetForm){
    var dataRow = document.getElementById(dataId);
    var dataSet = Array.from(dataRow.children);
    var fileSet = document.querySelectorAll(".file" + dataId);
    var insertForm = targetForm.querySelectorAll(".insert_input");
    var insertFile = targetForm.querySelectorAll(".insert_file");
    var textArea = targetForm.querySelectorAll("textarea");
    var img_frame = targetForm.querySelector("#img_frame");

    for(var i=0; i < insertForm.length; i++){
        insertForm[i].value = dataSet[i].innerHTML;
    }

    for(var i=0; i < insertFile.length; i++){
        textArea[i].value = fileSet[i].value;
        insertFile[i].required = false;
    }

    targetForm.querySelector(".insert_button").value = dataId;
    img_frame.firstElementChild.src = fileSet[0].value;
}

function clearData(targetForm, img_frame){
    var insertForm = targetForm.querySelectorAll(".insert_input");
    var textArea = targetForm.querySelectorAll("textarea");
    var insertFile = targetForm.querySelectorAll(".insert_file");

    for(var i=0; i < insertForm.length; i++){
        insertForm[i].value = "";
    }

    for(var i=0; i < insertFile.length; i++){
        textArea[i].value = "";
        insertFile[i].required = true;
    }
    
    img_frame.firstElementChild.src = "/IMG/image_icon.png";
}

function isValidContents(contents) {
    if (contents == '') {
        alert('Please enter contents');
        return false;
    }
    if (contents.trim().length > 140) { // trim: cut front and back ws
        alert('Contents cannot be larger than 140 characters');
        return false;
    }
    return true;
}

// generate random username
function genRandomName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        let number = Math.random() * charactersLength;
        let index = Math.floor(number);
        result += characters.charAt(index);
    }
    return result;
}


function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

// When edit button clicked, send contents to textarea
function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// called every HTML load occurs
$(document).ready(function () {
    getMessages();
})

// GET memos saved in DB
function getMessages() {
    // remove current memo container
    $('#cards-box').empty();
    // call memos in DB and append it to container
    $.ajax({
        type: 'GET',
        url: '/api/memos',
        success: function (response) { // response contains list of memo
            for (let i = 0; i < response.length; i++) {
                let memo = response[i]
                let id = memo.id
                let username = memo.username
                let contents = memo.contents
                let modifiedAt = memo.modifiedAt
                addHTML(id, username, contents, modifiedAt)
            }
        }
    })

}

// create memo HTML tag & append to parents container
function addHTML(id, username, contents, modifiedAt) {
    // create HTML tag
    let tempHtml = `<div class="card">
                    <!-- date/username -->
                    <div class="metadata">
                        <div class="date">
                            ${modifiedAt}
                        </div>
                        <div id="${id}-username" class="username">
                            ${username}
                        </div>
                    </div>
                    <!-- contents -->
                    <div class="contents">
                        <div id="${id}-contents" class="text">
                            ${contents}
                        </div>
                        <div id="${id}-editarea" class="edit">
                            <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                    <!-- footer -->
                    <div class="footer">
                        <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                        <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                        <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                    </div>
                </div>`;
    // append HTML to cards-box
    $('#cards-box').append(tempHtml);
}

// craete memo
function writePost() {
    // load contents
    let contents = $('#contents').val();
    // check contents validity
    if (isValidContents(contents) == false) {
        return; // escape writePost()
    }
    // generate username
    let username = genRandomName(10)
    // create data JSON object
    let data = {'username': username, 'contents': contents}
    // ajax POST method
    $.ajax({
        type: "POST",
        url: "/api/memos",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('POST success');
            window.location.reload();
        }
    });
}

// submit edit & PUT request
function submitEdit(id) {
    // check username and contents of the memo
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    // check contents validity
    if (isValidContents(contents) == false) {
        return;
    }
    // create JSON object
    let data = { 'username': username, 'contents': contents }
    // PUT request
    $.ajax({
        type: 'PUT',
        url: `/api/memos/${id}`,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            alert('PUT success')
            window.location.reload()
        }
    })
}

// delete memo
function deleteOne(id) {
    // DELETE request
    $.ajax({
        type: 'DELETE',
        url: `/api/memos/${id}`,
        success: function(response) {
            alert('DELETE success')
            window.location.reload()
        }
    })
}
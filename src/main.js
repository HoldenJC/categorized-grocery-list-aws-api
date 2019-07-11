import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGroceryList, addItem, editItem, strikeItem, deleteItem, clearList, initializeBackEnd, getUsersAWS, addUserAWS, deleteUserAWS } from './backend-code';

function attachSubmitHandler (category) {   // Gives function to each category button
  $('#' + category).click(function(){
    $('form').submit(function(event) {
      event.preventDefault();
    });

    let newItem = $('#inputItemName').val();
    addItem(newItem, category);
    updateDisplay(getGroceryList());
    $('form')[0].reset();
  });
}

function attachAwsHandlers () {   // Gives function to upload and download buttons
  $('#buttonDownload').click(function() {
    let userName = $('#userNameDownload').val();
    getUsersAWS(userName);
    $('#downloadStatus').html("<br>Loading list...");
    setTimeout(function(){
      $('#downloadStatus').empty();
      $('#listName').text(`${userName}'s List`);
      updateDisplay(getGroceryList());
    }, 3000);
  });

  $('#buttonUpload').click(function() {
    let userName = $('#userNameUpload').val();
    $('#downloadStatus').append("<br>Saving list...");
    deleteUserAWS(userName);
    setTimeout(function(){
      addUserAWS(userName);
      $('#downloadStatus').empty();
      $('#listName').text(userName);
    }, 2000);
  });
}

function emptyDisplay() {
  $("#produceList").empty();
  $("#proteinsList").empty();
  $("#other-foodsList").empty();
  $("#non-foodsList").empty();
}

function updateDisplay(grocList){   // This function is called at end of every action
  emptyDisplay();

  grocList.forEach(function(groceryItem){
    if (groceryItem.name){
      $(`#${groceryItem.category}List`).append(`<li><span id="${groceryItem.id}">${groceryItem.name}</span><span id="edit${groceryItem.id}" class="emoji"> &#128396;</span> <span id="delete${groceryItem.id}" class="emoji"> &#10060;</span></li>`);

      if (groceryItem.strikethrough){
        $(`#${groceryItem.id}`).addClass("crossed");
      }

      $("#" + groceryItem.id).click(function(){   // Enables crossing out of item upon click
        strikeItem(groceryItem.id)
        updateDisplay(getGroceryList());
      });

      $(`#edit${groceryItem.id}`).click(function(){   // Enables editing
        $(this).hide();
        $(`#delete${groceryItem.id}`).after(`<input id="editInput${groceryItem.id}"> <button id="submitEdit${groceryItem.id}" class="btn btn-success">Rename</button>`);
        $(`#submitEdit${groceryItem.id}`).click(function() {
          let newName = $(`#editInput${groceryItem.id}`).val();
          editItem(newName, groceryItem.id);
          updateDisplay(getGroceryList());
        });
      });

      $(`#delete${groceryItem.id}`).click(function(){   // Enables item delete
        deleteItem(groceryItem.id);
        updateDisplay(getGroceryList());
      });
    }
  });
}

initializeBackEnd();
updateDisplay(getGroceryList());

$(document).ready(function() {
  attachSubmitHandler("produce");
  attachSubmitHandler("proteins");
  attachSubmitHandler("other-foods");
  attachSubmitHandler("non-foods");

  $('#clearList').click(function() {
    clearList();
    updateDisplay(getGroceryList());
  });

  attachAwsHandlers();
});

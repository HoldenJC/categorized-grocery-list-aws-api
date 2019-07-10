import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGroceryList, addItem, editItem, strikeItem, deleteItem, clearList, initializeBackEnd } from './backend-code';


initializeBackEnd();
console.log(getGroceryList());
updateDisplay(getGroceryList());

const attachSubmitHandler = function (category) {
  $('#' + category).click(function(){
    $('form').submit(function(event) {
      event.preventDefault();
    });

    let newItem = $('#inputItemName').val();
    console.log(newItem + " " + category);
    addItem(newItem, category);
    updateDisplay(getGroceryList());
    $('form')[0].reset();
  });
}

function emptyDisplay() {
  $("#produceList").empty();
  $("#proteinsList").empty();
  $("#other-foodsList").empty();
  $("#non-foodsList").empty();
}

function updateDisplay(grocList){
  emptyDisplay();

  grocList.forEach(function(groceryItem){
    if (groceryItem.name){
      $(`#${groceryItem.category}List`).append(`<li><span id="${groceryItem.id}">${groceryItem.name}</span><span id="edit${groceryItem.id}" class="emoji"> &#128396;</span> <span id="delete${groceryItem.id}" class="emoji"> &#10060;</span></li>`);

      if (groceryItem.strikethrough){
        $(`#${groceryItem.id}`).addClass("crossed");
      }

      $("#" + groceryItem.id).click(function(){
        strikeItem(groceryItem.id)
        console.log("STRIKE this " + groceryItem.name)
        updateDisplay(getGroceryList());
      });

      $(`#edit${groceryItem.id}`).click(function(){
        $(this).hide();
        $(`#delete${groceryItem.id}`).after(`<input id="editInput${groceryItem.id}"> <button id="submitEdit${groceryItem.id}" class="btn btn-success">Rename</button>`);
        $(`#submitEdit${groceryItem.id}`).click(function() {
          let newName = $(`#editInput${groceryItem.id}`).val();
          editItem(newName, groceryItem.id);
          console.log(newName)
          updateDisplay(getGroceryList());
        })
        console.log("deleteItem(groceryItem.id)" + groceryItem.id);
      });

      $(`#delete${groceryItem.id}`).click(function(){
        deleteItem(groceryItem.id);
        console.log("deleteeeee " + groceryItem.id);
        updateDisplay(getGroceryList());
      });
    }
  });
}

$(document).ready(function() {
  attachSubmitHandler("produce");
  attachSubmitHandler("proteins");
  attachSubmitHandler("other-foods");
  attachSubmitHandler("non-foods");

  $('#clearList').click(function() {
    console.log("CLEAR")
    clearList();
    updateDisplay(getGroceryList());
  })
});


//get / creates local if not get
//let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//set
//localStorage.setItem('items', JSON.stringify(groceryList));

//localStorage.clear();

//add()
//modify()
//delete()
//clear

//if click one that is crossed out, item.uncrossOut()
//delete button
//replace pen with pencil
//anwaaaaaaaaaaaaaay
//soooooooooooooooooooooooooooooooo
//steal pencil button
//

//getList
//add item
//deleteItem/
//strikeItem
//editItem
//clearList
//

import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { CLASSNAME } from './backend-code';

// Back end -----------------------
class FoodItem{
  constructor(itemName, category, id){
    this.itemName = itemName;
    this.category = category;
    this.id = id;
  }
}

let groceryList = [];

let broc = new FoodItem("brocolli", "produce", "001");
let toma = new FoodItem("tomato", "produce", "002");
let legOfAnimal = new FoodItem("chickenLeg", "proteins", "003");

groceryList.push(broc);
groceryList.push(toma);
toma.crossed = true;
groceryList.push(legOfAnimal);


// ---------------------------------
updateDisplay(groceryList);

const attachSubmitHandler = function (category) {
  $('#' + category).click(function(){
    $('form').submit(function(event) {
      event.preventDefault();
    });

    let newItem = $('#inputItemName').val();
    console.log(newItem + " " + category);
    // addItem(newItem, category);
    updateDisplay(groceryList);
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
    $(`#${groceryItem.category}List`).append(`<li><span id="${groceryItem.id}">${groceryItem.itemName}</span><span id="edit${groceryItem.id}" class="emoji"> &#128396;</span> <span id="delete${groceryItem.id}" class="emoji"> &#10060;</span></li>`);

    if (groceryItem.crossed){
      $(`#${groceryItem.id}`).addClass("crossed");
    }

    $("#" + groceryItem.id).click(function(){
      // strikeItem(groceryItem.id);
      console.log("STRIKE this " + groceryItem.itemName)
      updateDisplay(grocList);
    });

    $(`#edit${groceryItem.id}`).click(function(){
      $(this).hide();
      $(`#delete${groceryItem.id}`).after(`<input id="editInput${groceryItem.id}"> <button id="submitEdit${groceryItem.id}" class="btn btn-success">Rename</button>`);
      $(`#submitEdit${groceryItem.id}`).click(function() {
        let newName = $(`#editInput${groceryItem.id}`).val();
        // editItem(newName, groceryItem.id);
        console.log(newName)
        updateDisplay(grocList);
      })
      console.log("deleteItem(groceryItem.id)" + groceryItem.id);
    });

    $(`#delete${groceryItem.id}`).click(function(){
      //delete()
      console.log("deleteeeee " + groceryItem.id);
      updateDisplay(grocList);
    });
  });
}



$(document).ready(function() {
  attachSubmitHandler("produce");
  attachSubmitHandler("proteins");
  attachSubmitHandler("other-foods");
  attachSubmitHandler("non-foods");

  $('#clearList').click(function() {
    //clearList();
    //updateDisplay(groceryList);
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

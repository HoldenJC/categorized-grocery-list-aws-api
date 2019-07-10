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
// ---------------------------------

const attachSubmitHandler = function (category) {
  $('#' + category).click(function(){
    $('form').submit(function(event) {
      event.preventDefault();
    });

    let newItem = $('#inputItemName').val();
    console.log(newItem + " " + category);
    // addItem(newItem, category);
    $('form')[0].reset();
  });
}

$(document).ready(function() {
  attachSubmitHandler("produce");
  attachSubmitHandler("proteins");
  attachSubmitHandler("other-foods");
  attachSubmitHandler("non-foods");
});

function emptyDisplay(){
  $("#produceList").text("");
  $("#proteinsList").text("");
  $("#other-foodsList").text("");
  $("#non-foodsList").text("");
}

function updateDisplay(grocList){
  emptyDisplay();
  grocList.forEach(function(groceryItem){
    $("#" + groceryItem.category + "List").append(`<li id="${groceryItem.id}">${groceryItem.itemName}</li>`);
    $("#" + groceryItem.id).click(function(){
      //deleteItem(groceryItem.id)
      console.log("deleteItem(groceryItem.id)" + groceryItem.id);
      updateDisplay(grocList);
    });
  });
}

// Back end code -------------------

let groceryList = [];

let broc = new FoodItem("brocolli", "produce", "001");
let toma = new FoodItem("tomato", "produce", "002");
let legOfAnimal = new FoodItem("chickenLeg", "proteins", "003");

groceryList.push(broc);
groceryList.push(toma);
groceryList.push(legOfAnimal);

updateDisplay(groceryList);

//get / creates local if not get
//let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//set
//localStorage.setItem('items', JSON.stringify(groceryList));

//localStorage.clear();

//add()
//modify()
//delete()
//clear


//display items
//delete

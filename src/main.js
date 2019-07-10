import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { CLASSNAME } from './backend-code';

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

//get / creates local if not get
//let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//set
//localStorage.setItem('items', JSON.stringify(groceryList));

//localStorage.clear();

//add()
//modify()
//delete()
//clear

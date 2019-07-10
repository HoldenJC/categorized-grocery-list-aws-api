import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clearAll = document.getElementById('clearList');
const input = document.getElementById('addItem');
let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let idLocal = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;
let idCount = parseInt(idLocal);

localStorage.setItem('items', JSON.stringify(groceryList));
const localData = JSON.parse(localStorage.getItem('items'));

console.log(groceryList);
console.log(idCount);
console.log(localData);

const groceryItemAppender = text => {
  // const li = document.createElement('li');
  $("#groceryList").append(`<p id="${idCount}"></p>`)
  $(`#${idCount}`).html(text);
  // li.textContent = text;
  // ul.appendChild(li);
  $(`#${idCount}`).click(function(){
    $(this).empty();
  });
};



form.addEventListener('submit', function(event) {
  event.preventDefault();

  groceryList.push({name:`${input.value}`,id:`${idCount}`});
  localStorage.setItem('items', JSON.stringify(groceryList));

  groceryItemAppender(`${input.value}, id: ${idCount}`);
  // groceryItemAppender(input.value);
  idCount++;
  localStorage.setItem('id', JSON.stringify(idCount));
  input.value = '';
});

localData.forEach(item => {
  groceryItemAppender(`${item.name}, id: ${item.id}`);
});

clearAll.addEventListener('click', function() {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});

$(document).ready(function() {

});

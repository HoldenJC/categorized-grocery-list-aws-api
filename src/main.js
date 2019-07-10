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


const groceryItemAppender = num => {
  $("#groceryList").append(`<p id="${num}"></p>`)
  $(`#${num}`).html(`${groceryList[num].name} <button id="b${num}">Edit</button><button id="m${num}">Confirm</button>`);
  $(`#m${num}`).hide();

  $(`#b${num}`).click(function(){
    $(this).after(`<input id="i${num}">`);
    $(`#m${num}`).show();
    $(this).hide();
  });

  $(`#m${num}`).click(function(){
    console.log(groceryList[num]);
    groceryList[num].name = $(`#i${num}`).val()
    $(`#${num}`).html($(`#i${num}`).val());
    localStorage.setItem('items', JSON.stringify(groceryList));
    console.log(groceryList);
  });
};

form.addEventListener('submit', function(event) {
  event.preventDefault();

  groceryList.push({name:`${input.value}`,id:`${idCount}`});
  localStorage.setItem('items', JSON.stringify(groceryList));

  console.log(groceryList);

  groceryItemAppender(idCount);
  idCount++;
  localStorage.setItem('id', JSON.stringify(idCount));
  input.value = '';
});

localData.forEach(item => {
  $("#groceryList").append(`<p id="${item.id}"></p>`)
  $(`#${item.id}`).html(`${item.name} <button id="b${item.id}">Edit</button>`);
  $(`#b${item.id}`).click(function(){
    $(this).after(`<input id="i${item.id}"><button id="m${item.id}">Confirm</button>`);
    $(this).hide();

    $(`#m${item.id}`).click(function(){
      groceryList[item.id].name = $(`#i${item.id}`).val();
      $(`#${item.id}`).html($(`#i${item.id}`).val());
      localStorage.setItem('items', JSON.stringify(groceryList));
    });
  });
});

clearAll.addEventListener('click', function() {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});

$(document).ready(function() {

});

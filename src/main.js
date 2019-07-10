import $ from 'jquery';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('addItem');
let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(groceryList));
const localData = JSON.parse(localStorage.getItem('items'));

const groceryItemAppender = text => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
};

form.addEventListener('submit', function(event) {
  event.preventDefault();

  groceryList.push(input.value);
  localStorage.setItem('items', JSON.stringify(groceryList));

  groceryItemAppender(input.value);
  input.value = '';
});

localData.forEach(item => {
  groceryItemAppender(item);
});

document.getElementById('clearList').addEventListener('click', function() {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});

$(document).ready(function() {
 
});


import $ from 'jquery';

const strike = false;
let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let idLocal = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;
let idCount = parseInt(idLocal);

export getGroceryList(){
  return groceryList;
}

export function addItem(name, category){
  groceryList.push({name:`${name}`,id:`${idCount}`,category:`${category}`,strikethrough:`${strike}`});
  localStorage.setItem('items', JSON.stringify(groceryList));
  idCount++;
}

export function editItem(groceryList, name, id, category){
  groceryList[id].name = name;
  groceryList[id].category = category;
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function strikeItem(groceryList, id){
  if(groceryList[id].strikethrough === false){
    groceryList[id].strikethrough = true;
  } else {
    groceryList[id].strikethrough = false;
  }
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function deleteItem(groceryList, id){
  groceryList[id].name = '';
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function clearList(){
  localStorage.clear();
  $("#groceryList").empty();
}

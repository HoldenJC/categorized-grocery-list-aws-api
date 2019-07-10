import $ from 'jquery';

let groceryList;
let idLocal;
let idCount;

export function initializeBackEnd(){
   groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
   idLocal = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;
   idCount = parseInt(idLocal);
}

export function getGroceryList(){
  return groceryList;
}

export function addItem(name, category){
  groceryList.push({name:`${name}`,id:`${idCount}`,category:`${category}`,strikethrough:false});
  localStorage.setItem('items', JSON.stringify(groceryList));
  idCount++;
}

export function editItem(name, id, category){
  groceryList[id].name = name;
  if (category){
    groceryList[id].category = category;
  }
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function strikeItem(id){
  if(groceryList[id].strikethrough === false){
    groceryList[id].strikethrough = true;
  } else {
    groceryList[id].strikethrough = false;
  }
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function deleteItem(id){
  console.log("BACK END DELETE: " + id);
  groceryList[id].name = '';
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function clearList(){
  localStorage.clear();
  initializeBackEnd();
}


//import all functions
//rewrite first thing to initalze all that stfuf
//

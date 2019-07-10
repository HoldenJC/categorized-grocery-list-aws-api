import $ from 'jquery';
import axios from "axios";

const strike = false;
let groceryList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let idLocal = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : 0;
let idCount = parseInt(idLocal);

export function getGroceryList(){
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

export function getUserAWS() {
  axios.get(`https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers`)
    .then(response => {
      console.log(response)
      // $(".output").append(`<br>${response.data[x].userName}`);
    });
}

export function addUserAWS(groceryList, userName) {
      // Adds new entry to database
    try {
      const params = {
        "userName": userName,
        "groceryList": groceryList
      }
      axios.post(`https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers/${userName}`, params );
    } catch (err) {
      $(".output").append(`An error occured: ${err}`);
    }
}

import $ from 'jquery';
import axios from "axios";

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
  groceryList[id].name = '';
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function clearList(){
  localStorage.clear();
  initializeBackEnd();
}

export function getUsersAWS(userName) {
  axios.get(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers`)
    .then(response => {
      console.log(response);
      for(let i = 0; i < response.data.length; i++){
        if(response.data[i].userName === userName){
          localStorage.clear();
          groceryList = response.data[i].groceryList;
          localStorage.setItem('items', JSON.stringify(groceryList));
          // return groceryList;
        }
      }
      let downloadListLength = groceryList.length - 1;
      idCount = parseInt(groceryList[downloadListLength].id) + 1;
      console.log(idCount);
    });
}

export function addUserAWS(userName) {
    try {
      const params = {
        "userName": userName,
        "groceryList": groceryList
      }
      axios.post(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers/${userName}`, params );
    } catch (err) {
      $(".output").append(`An error occured: ${err}`);
    }
}

export function deleteUserAWS(userName) {
  try {
    const params = {
      "userName": userName
    }
    axios.delete(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers/${userName}`, params );
  } catch (err) {
    $(".output").append(`An error occured: ${err}`);
  }

}

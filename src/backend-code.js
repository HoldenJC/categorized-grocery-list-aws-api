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

export function getUsersAWS(userName) {
  axios.get(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers`)
    .then(response => {

      for(let i = 0; i < response.data.length; i++){
        if(response.data[i].userName === userName){
          localStorage.clear();
          groceryList = response.data[i].groceryList;
          localStorage.setItem('items', JSON.stringify(groceryList));
          console.log(groceryList);
        }
      }
    });
}

export function addUserAWS(userName, groceryList) {
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

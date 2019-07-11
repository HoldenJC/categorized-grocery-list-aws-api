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
  console.log(idCount);
  return groceryList;
}

function getItemById(id, ra){
  for(let i = 0; i < ra.length; i++){
    if (ra[i].id === id){
      return ra[i];
    } else {
      console.log("RA DID NOT HAVE ELEMTN WITH THAT ID");
    }
  }
}

export function addItem(name, category){
  groceryList.push({name:`${name}`,id:`${idCount}`,category:`${category}`,strikethrough:false});
  localStorage.setItem('items', JSON.stringify(groceryList));
  idCount++;
  localStorage.setItem('id', JSON.stringify(idCount));
}

export function editItem(name, id, category){
  getItemById(id, groceryList).name = name;
  if (category){
    getItemById(id, groceryList).category = category;
  }
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function strikeItem(id){
  if(getItemById(id, groceryList).strikethrough === false){
    getItemById(id, groceryList).strikethrough = true;
  } else {
    getItemById(id, groceryList).strikethrough = false;
  }
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function deleteItem(id){
  groceryList.splice(groceryList.indexOf(getItemById(id, groceryList)), 1);
  localStorage.setItem('items', JSON.stringify(groceryList));
}

export function clearList(){
  localStorage.clear();
  initializeBackEnd();
}

export function getUsersAWS(userName) {
  return axios.get(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers`)
    .then(response => {
      console.log(response);
      let userFound = false;
      for(let i = 0; i < response.data.length; i++){
        if(response.data[i].userName === userName){
          localStorage.clear();
          groceryList = response.data[i].groceryList;
          localStorage.setItem('items', JSON.stringify(groceryList));
          userFound = true;
          let downloadListLength = groceryList.length - 1;
          idCount = parseInt(groceryList[downloadListLength].id) + 1;
          localStorage.setItem('id', JSON.stringify(idCount));
        } else {
          console.log("no list");
        }
      }
      console.log(idCount);
      return userFound;
    });
}

export function addUserAWS(userName) {
    try {
      const params = {
        "userName": userName,
        "groceryList": groceryList
      }
      let downloadListLength = groceryList.length - 1;
      idCount = parseInt(groceryList[downloadListLength].id) + 1;
      return axios.post(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers/${userName}`, params );
    } catch (err) {
      $(".output").append(`An error occured: ${err}`);
    }
}

export function deleteUserAWS(userName) {
  try {
    const params = {
      "userName": userName
    }
     return axios.delete(`https://cors-anywhere.herokuapp.com/https://r11ze6nefi.execute-api.us-west-2.amazonaws.com/test/groceryusers/${userName}`, params );
  } catch (err) {
    $(".output").append(`An error occured: ${err}`);
  }

}

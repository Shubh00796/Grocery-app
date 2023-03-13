// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery= document.getElementById("grocery");
const submitbtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearbtn = document.querySelector(".clear-btn");



// edit option
let editElement;
let editFlag = false;
let editID  = "";

// ****** EVENT LISTENERS **********
//submit-form
form.addEventListener("submit", additem);//we will ref the add items as a function in oreder to access the grocery elemnts
//clear form.
clearbtn.addEventListener("click",clearItems);

// ****** FUNCTIONS **********
function additem(e){
  e.preventDefault();//it will prevent to print thr deafult values
  const value = grocery.value;//add new values that has been entered vy user
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    //craete the element
    const element = document.createElement("article");
    //add html class to the elemnt.
    element.classList.add("grocery-item");
    //add id.
    const attr = document.createAttribute("data-id");//dataset is the property use to set and access data attribute using the js
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn"type="button">
            <i class="fas fa-edit"></i>
          </button>
          <button class="delete-btn"type="button">
            <i class="fas fa-trash"></i>
          </button>

        </div> `
//edit and delete buttons
const dltbtn = element.querySelector(".delete-btn");
const editbtn = element.querySelector(".edit-btn");
dltbtn.addEventListener("click",deleteitem);
editbtn.addEventListener("click",edititem);
// append child
list.appendChild(element);//added the elemnet to thne list
//displayalert function to show item addedto LIst.
displayalert("item added to the list","success");
//show container
container.classList.add("show-container");
//add to local storage
addToLocalStorage(id,value);
//set back to deafult
setBackToDefault();


  }
  else if(value && editFlag ){
    editElement.innerHTML = value;
    displayalert("value changed","success");
    //edit local storege
    editLocalStorage(editID,value);


    setBackToDefault();

  }
  else{
    displayalert("please enter the values!", "danger");

  }
}

function displayalert(text , action){
  alert.textContent=  text;
  alert.classList.add(`alert-${action}`);


  setTimeout(function(){
    alert.textContent= " ";
    alert.classList.remove(`alert-${action}`);

  },1500);
}
// clear ITEMS
function clearItems(){
  const items = document.querySelectorAll(".grocery-item");

  if(items.length > 0){
    items.forEach(function(item){
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayalert("The list is empty", "danger");
  setBackToDefault();
  //local.storege.removeItem("list");


}
//delete FUNCTIONS
function deleteitem(e){
  //we ned to remove th parent class
    const element  = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
      container.classList.remove("show-container");
    }
    displayalert("The item is deleted sucessfully","success");
    setBackToDefault();
    //remove foem local storage
    //removefromthelocalstorage(id);
}
//edit FUNCTIONS
function edititem(e){
  const element  = e.currentTarget.parentElement.parentElement;
//set edit items
editElement = e.currentTarget.parentElement.previousElementSibling;
//set form value
grocery.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id;
submitbtn.textContent = "edit";






}
//set back to deafult
function setBackToDefault(){
grocery.value = "";
editFlag = false;
editID = "";
submitbtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items)); //The JSON.stringify() method converts a JavaScript value to a JSON string
}

function removefromthelocalstorage(id){
  console.log("okay");
}

function editLocalStorage(id,value) {


}




// ****** SETUP ITEMS **********

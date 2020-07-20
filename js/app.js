//Selecting element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
// const clearALL = document
//classes names

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

//variables
let LIST, id;
//store variable
let data = localStorage.getItem("TODO");
//check empty or not
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//user interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//todays date
const options = { year:"numeric", month:"long", day:"numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//adding fuctions

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? check : uncheck;
  const line = done ? line_through : "";
  const item = `     <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${line}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//adding items
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    //if the input isnt empty
    if (toDo) {

      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
         id : id,
        done: false,
        trash: false,
      });
      //add store
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//complete to do
function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line_through);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the items
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value; // c or del

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  //add store
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

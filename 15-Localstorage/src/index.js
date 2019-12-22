const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem("items")) || [];
const deleteBtn = document.querySelector(".delete");
const checkBtn = document.querySelector(".check-uncheck");

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name = item]").value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
    })
    .join("");
}

// event delegation is done here
// instead of listening to clicks on <li>/itemsList, we're listening it on it's parent ul
function toggleDone(e) {
  if (!e.target.matches("input")) return; //skip this if the item we're clicking is not input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteAll() {
  if (window.confirm("Are you sure you want to delete all items?")) {
    itemsList.innerHTML = `<li>Loading Tapas...</li>`;
    items = [];
    localStorage.removeItem("items");
  }
}

let isChecked = false;
function checkOrUncheckAll() {
  if (!isChecked) {
    items.map(item => {
      return (item.done = true);
    });
    populateList(items, itemsList);
    checkBtn.textContent = "Uncheck All";
  } else {
    items.map(item => {
      return (item.done = false);
    });
    populateList(items, itemsList);
    checkBtn.textContent = "Check All";
  }
  isChecked = !isChecked;
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
deleteBtn.addEventListener("click", deleteAll);
checkBtn.addEventListener("click", checkOrUncheckAll);

populateList(items, itemsList);

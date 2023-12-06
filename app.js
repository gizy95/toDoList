const form = document.querySelector('form');
const unorderedList = document.querySelector('ul');
const submitBtn = document.querySelector('#add');
const inputField = document.querySelector('input');
const cancelBtn = document.querySelector('#cancel');
let itemToBeUpdated;

// Get stored data if it exist otherwise set it as an empty array
let toDoList = JSON.parse(localStorage.getItem('toDo')) || [];

const getUniqueId = () => {
  const currentDate = new Date();
  const milliSeconds =
    currentDate.getMilliseconds();
  const id = Math.floor(
    Math.random()
    * 1000
    * milliSeconds);
  return id
}

function createToDo(id, toDoItem) {
  return {
    id: id,
    title: toDoItem
  }
}

const storeTodoList = (toDoList) => {
  try {
    localStorage.setItem(
      'toDo',
      JSON.stringify(toDoList)
    );
  } catch (error) {
    console.error('Failed to store data in the local storage.')
  }

}

const getInputValue = (event) => {
  return event.target.elements.input.value;
}

const cancelEdit = () => {
  cancelBtn.style.display = 'inline-block';
  cancelBtn.addEventListener('click', (event) => {
    cancelBtn.style.display = 'none';
    event.target.elements.input.value = '';
  })
}

const addEventListenerToEachItem = () => {
  // This function adds eventLister to each 
  // Since there are multiple items loop through each
  const listItems = document.querySelectorAll('li span span');
  listItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const toDoId = Number(event.target.id);
      // Assign item t be updated to a global variable
      // So that we can update it in another function
      itemToBeUpdated = toDoList.find(item => item.id === toDoId);
      // Change Add button to Edit button
      submitBtn.textContent = 'Edit';
      inputField.value = itemToBeUpdated.title;

      cancelEdit();

      });
    });
};

//ADDS STRIKE THROUGH TO ITEMS ON LIST BASED ON CLASS NAME
const displayToDoLists = (toDoList) => {
  unorderedList.innerHTML = '';
  toDoList.forEach(item => {

    const li = document.createElement('li');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    li.appendChild(checkBox);
    //ADDS CHECKBOX AND TITLE TO LIST
    const text = document.createElement('span');
    text.innerText = item.title;
    // Add id for updating lists
    text.setAttribute('id', item.id);
    
    const span = document.createElement('span');
    span.appendChild(checkBox);
    span.appendChild(text);

    li.appendChild(span);

    //ADDS DELETE BUTTON TO LIST
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('delete-button');
    li.appendChild(deleteButton);

    unorderedList.appendChild(li);

    //ADDS STRIKE THROUGH TO ITEMS ON LIST BASED ON CLASS NAME
    checkBox.addEventListener('change', function () {
      if (this.checked) {
        text.classList.add('strikethrough');
      } else {
        text.classList.remove('strikethrough');
      }
    });

    deleteButton.addEventListener('click', function() {
      if (window.confirm("Are you sure you want to delete this item?")) {
      li.remove();
      const index = toDoList.findIndex(todo => todo.id === item.id);
      toDoList.splice(index, 1);
      storeTodoList(toDoList);
      displayToDoLists(toDoList); 
     
      }
    });
    
  })
   // Everytime the list has been updated add eventListner 
      addEventListenerToEachItem();
}
// Display after refreshing the page
displayToDoLists(toDoList);


form.addEventListener('submit', (event) => {
  event.preventDefault();
  // If update mode is active
  if(itemToBeUpdated) {
    itemToBeUpdated.title = inputField.value;
    submitBtn.textContent = 'Add';
    itemToBeUpdated = '';
    // Reset input field
    event.target.elements.input.value = '';
    cancelBtn.style.display = 'none';
    storeTodoList(toDoList);
    // Display the To DO lists      
    displayToDoLists(toDoList);
  } else {
      const inputValue = getInputValue(event);
      if (inputValue) {
        const newToDo = createToDo(getUniqueId(), inputValue);
        // Add new to do
        toDoList.push(newToDo);
        // Store data in the localstorage
        storeTodoList(toDoList);
        // Reset input field
        event.target.elements.input.value = '';
        // Display the To DO lists
        displayToDoLists(toDoList);
      } else {
        // TO DO: disable button instead aleart is not good for UX
        alert('Please input things to do first!');
      }
  }
})






























































































































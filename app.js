const form = document.querySelector('form');
const unorderedList = document.querySelector('ul');

let toDoList = JSON.parse(localStorage.getItem('toDO'))||[];

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
    id:id,
    title:toDoItem
  }
} 

const storeTodoList = (toDoList) => {
  try{
    localStorage.setItem(
      'toDO',
      JSON.stringify(toDoList)
    );
  } catch(error) {
    console.error('Failed to store data in the local storage.')
  }

}

const getInputValue = (event) => {
  return event.target.elements.input.value;
}
//ADDS STRIKE THROUGH TO ITEMS ON LIST BASED ON CLASS NAME
const addsStrike = () => {

document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click', function() {
        item.classList.toggle('strikethrough');
    });
});

}

const displayToDoLists = (toDoList) => {
  unorderedList.innerHTML = '';
  toDoList.forEach(item => {
     
     const li = document.createElement('li');
    
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    li.appendChild(checkBox);

    const text = document.createElement('span');
    text.innerText = item.title;
    li.appendChild(text);

    unorderedList.appendChild(li);
    

    checkBox.addEventListener('change', function() {
      if(this.checked) {
        li.classList.add('strikethrough');
      } else {
        li.classList.remove('strikethrough');
      }
    });
    
  })
}
// Display after refreshing the page
displayToDoLists(toDoList);


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = getInputValue(event);
  if(inputValue) {
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

})






























































































































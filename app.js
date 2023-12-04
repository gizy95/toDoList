const form = document.querySelector('form');
const unorderedList = document.querySelector('ul');


const toDOArray = [];

const getUniqueId = () => {
  const currentDate = new Date();
  const milliSeconds =
   currentDate.getMilliseconds();
  id = Math.floor(
    Math.random()
     * 1000
     * milliSeconds);
  return id
}

function createToDO(id, toDoItem) {
  return {
    id:id,
    title:toDoItem
  }
} 

const storeTodoList = () => {
  localStorage.setItem(
    'toDO',
    JSON.stringify(toDOArray)
  );
}

const getInputValue = (event) => {
  const inputValue = event.target.elements.input.value;
  return inputValue;
}

const displayToDoLists = () => {
  const toDoLists = JSON.parse(localStorage.getItem('toDO'));
  unorderedList.innerHTML = '';
  toDoLists.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list')
    li.innerText = item.title;
    unorderedList.appendChild(li);
    addsStrike();
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = getInputValue(event);
  const result = createToDO(getUniqueId(), inputValue);
  // Add new object to the toDO array
  toDOArray.push(result);
  // Store data in the localstorage
  storeTodoList(toDOArray);
  // Reset input field
  event.target.elements.input.value = '';
  // Display the To DO lists
  displayToDoLists();
})



























































































































































//ADDS STRIKE THROUGH TO ITEMS ON LIST BASED ON CLASS NAME
const addsStrike = () => {

document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click', function() {
        item.classList.toggle('strikethrough');
    });
});

}

addsStrike();
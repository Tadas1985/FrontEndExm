let toDoId;
const inputToDoCard = document.querySelector("#toDoCardInput");
const output = document.querySelector('.span2');
const addToDo = document.querySelector('#add');
const saveToDo = document.querySelector('#saveToDoCard');
const saveEditToDo = document.querySelector('#saveEditToDoCard');
///localStorage.setItem('userToDo', 'Tadas Valutis') //gaunamas useris kuris prisijungias
let user = localStorage.getItem('userToDo');
const UserText = document.querySelector('.h1');
UserText.textContent = user;
const typeToDo = document.querySelector('#tDType');
const contentToDo = document.querySelector('#contentText');
const endDateToDo = document.querySelector('#endDate'); 
const addToDoH3 = document.querySelector('.h3ToDoCard');

document.querySelector("#add").addEventListener("click", () => {
  inputToDoCard.style.display = "block";
  saveToDo.style.display = "block";
  saveEditToDo.style.display = "none";
});
document.querySelector("#closeToDoCard").addEventListener("click", () => {
  document.querySelector("#toDoCardInput").style.display = "none";
});
document.querySelector("#logoff").addEventListener("click", () => {
  localStorage.clear();
  //console.log('log off buttton')
});

saveToDo.addEventListener('click', () => {
  console.log(endDateToDo.value);
  fetch('https://testapi.io/api/ABukis/resource/ToDoList', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: typeToDo.value,
      toDoContext: contentToDo.value,
      endDateToDo: endDateToDo.value,
      toDoDone: 'false'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
    }
  })
  .then((result) => {
  })
  .catch((err) => {
    console.log(err);
  })
  setTimeout(() => {   
    window.location.reload();
  }, 700)  
})
function getToDo() {
  fetch('https://testapi.io/api/ABukis/resource/ToDoList')
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    let filteredData = result.data.filter((element) => {
        return element.nameLastName === user;
    })
    console.log(filteredData);
    render(filteredData)
  }); 
}
function render(ToDos) {
  ToDos.forEach(ToDo => {
  const div = document.createElement('div');
  div.className = 'toDoCardDiv';

  const toDoTypeName = document.createElement('h2');
  toDoTypeName.textContent = ToDo.toDoType;
  toDoTypeName.className = 'toDoCardH1';

  const toDoContext = document.createElement('p');
  toDoContext.textContent = ToDo.toDoContext;
  toDoContext.className = 'toDoContextP';

  const toDoEndDate = document.createElement('p');
  toDoEndDate.textContent = ToDo.endDateToDo;
  toDoEndDate.className = 'toDoEndDateP';
  if (ToDo.toDoDone === 'false') {
    let dateStrig = `${ToDo.endDateToDo.replace(/-/g, ", ")}`;
    let add1DayToDate = new Date(dateStrig);
    if (new Date (add1DayToDate.setDate(add1DayToDate.getDate() -1)) < Date.now()){
      div.style.backgroundColor = 'rgba(221, 199, 125, 0.5)'
      if (new Date(dateStrig) < Date.now()){
        div.style.backgroundColor = 'rgba(219, 143, 143, 0.5)'
      }
    }
  }else if (ToDo.toDoDone === 'true'){
    div.style.backgroundColor = 'rgba(105, 221, 90, 0.5)'
  };

  const delButton = document.createElement('button');
  delButton.textContent = 'DELETE';
  delButton.className = 'toDoDelateB';
  delButton.addEventListener('click', (event) => {
    const elementId = event.target.parentElement.id;
    deleteToDo(elementId);
  })
  const editButton = document.createElement('button');
  editButton.textContent = 'EDIT';
  editButton.className = 'toDoEditB';
  editButton.addEventListener('click', (event) => {
    isOnEdit = true;
    const elementId = event.target.parentElement.id;
    toDoId = elementId;
    inputToDoCard.style.display = "block";
    saveToDo.style.display = 'none';
    saveEditToDo.style.display = 'block';
    typeToDo.value = ToDo.toDoType;
    contentToDo.value = ToDo.toDoContext;
    endDateToDo.value = ToDo.endDateToDo;
    addToDoH3.textContent = 'Editing To Do Form';
  })

  const doneButton = document.createElement('button');
  doneButton.textContent = 'DONE';
  doneButton.className = 'toDoDoneB';
  doneButton.addEventListener('click', (event) => {
    const elementId = event.target.parentElement.id;
    seveDoneToDO(elementId, ToDo);
  })

  div.append(toDoTypeName, toDoContext, toDoEndDate, editButton, delButton, doneButton);
  div.setAttribute('id', ToDo.id);
  output.append(div);
  })
}
window.addEventListener('load', () => {
  getToDo()
})
async function deleteToDo(toDoId) {
  const fethg = await fetch(`https://testapi.io/api/ABukis/resource/ToDoList/${toDoId}`, {
    method: 'DELETE'
  })
  console.log(fethg);
  output.innerHTML = '';
  if (fethg) {
    getToDo();
  }
}
saveEditToDo.addEventListener('click', () => {
  fetch(`https://testapi.io/api/ABukis/resource/ToDoList/${toDoId}`, {
    method: 'PUT',
    headers: {
     'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: typeToDo.value,
      toDoContext: contentToDo.value,
      endDateToDo: endDateToDo.value,
      toDoDone: 'false'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
    }
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  setTimeout(() => {
    saveToDo.style.display = "none";
    inputToDoCard.style.display = "none"; 
    window.location.reload();
  }, 700)  
})
function seveDoneToDO(toDoId){
  let toDoElement = document.getElementById(toDoId);
  fetch(`https://testapi.io/api/ABukis/resource/ToDoList/${toDoId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: toDoElement.querySelector('.toDoCardH1').textContent,
      toDoContext: toDoElement.querySelector('.toDoContextP').textContent,
      endDateToDo: toDoElement.querySelector('.toDoEndDateP').textContent,
      toDoDone: 'true'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
  }
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  setTimeout(() => {
    window.location.reload();
  }, 700)  
}
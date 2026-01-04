let call = document.getElementById('commit');
call.addEventListener('click', add);

window.addEventListener('load', rendertodoList);

function rendertodoList() {
  let todoList = JSON.parse(localStorage.getItem('cart')) || [];
  let todoListHTML = '';

  todoList.forEach(function(todo, index) {
    const checked = todo.completed ? 'checked': '';
    const html = `
    <tr>
    <td class="check"><input type="checkbox" ${checked} onchange="toggleCompleted(${index})" id="completed" /></td>
    <td class="task"> ${todo.task} </td>
    <td class="time"> ${todo.time} </td>
    <td class="deletebtn" onclick="deleteTask(${index});
    rendertodoList();
    " id="deletebtn">&times</td>
    </tr>
    `;

    todoListHTML += html;
  });

  document.getElementById('data')
    .innerHTML = todoListHTML;
};

function add() {
  let task = document.getElementById('task').value;
  let time = document.getElementById('time').value;

  console.log(task);

  if (task && time) {
    let todoList = JSON.parse(localStorage.getItem('cart')) || [];

    todoList.push({
      task,
      time,
      completed: false
    });

    localStorage.setItem('cart', JSON.stringify(todoList));

    document.getElementById('task').value = '';
    document.getElementById('time').value = '';

    rendertodoList();
  } else {
    alert('enter both Task and time');
  }
}

function toggleCompleted(index) {
  let todoList = JSON.parse(localStorage.getItem('cart')) || [];
  todoList[index].completed = !todoList[index].completed;
  localStorage.setItem('cart', JSON.stringify(todoList));
}

function deleteTask(index) {
  let todoList = JSON.parse(localStorage.getItem('cart')) || [];
  todoList.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(todoList));
  rendertodoList();
}
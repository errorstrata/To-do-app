const send = document.getElementById('commit')
send.addEventListener('click', sendData)

function sendData() {
    let task = document.getElementById('task').value
    let date = document.getElementById('time').value

    let data = {
      'task': task,
      'date': date
    }

    fetch('http://127.0.0.1:5000/tasks', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      getData()
    })
    .catch(err => console.log(err))
}

let input = document.getElementById('data')
function getData(){
    fetch('http://127.0.0.1:5000/tasks',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
   })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      htmldata = ''
      data.forEach(element => {
        htmldata += `<div class="card">
                        <h5 class="card-title">${element.task}</h5>
                        <p class="card-text">${element.date}</p>
                      </div>
                    `
      })
      input.innerHTML = htmldata
    })
    .catch(err => console.log(err))
}

window.onload = getData()
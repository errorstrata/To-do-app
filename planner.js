const send = document.getElementById('submit')

send.addEventListener('click', sendData)
function sendData() {
    const task = document.getElementById('task').value
    const date = document.getElementById('date').value

    let data = {
      'task': task,
      'date': date
    }

    fetch('http://127.0.0.1:5000/task', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}
const form = document.querySelector('form')
const loader = document.querySelector('.loader')
const howlsElement = document.querySelector('.howls')
const API_URL = 'http://localhost:5000/howls'

loader.style.display = "none";

listAllHowls()

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    const name = formData.get('name')
    const message = formData.get('message')

    const howl = {
        name,
        message
    }
    
    form.style.display = 'none'
    loader.style.display = 'block'

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(howl),
        headers : {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
      .then(createdHowl => {
          console.log(createdHowl)
          form.reset()
          form.style.display = 'block'
          loader.style.display = 'none'
      })
})

function listAllHowls() {
    fetch(API_URL)
        .then(res => res.json())
        .then(howls => {
            howls.reverse()
            howls.forEach(howl => {
                const div = document.createElement('div')

                const header = document.createElement('h4')
                header.textContent = howl.name
                header.className = 'bg-warning'
                
                const content = document.createElement('p')
                content.textContent = howl.message

                const date = document.createElement('p')
                date.textContent = new Date(howl.created)
                date.className = 'cite'

                div.appendChild(header)
                div.appendChild(content)
                div.appendChild(date)

                div.style.background = '#FF5733'

                   howlsElement.appendChild(div)
            });
        })
}
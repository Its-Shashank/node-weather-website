console.log('Client side javascript is loaded.')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // preventDefault prevents the page from refreshing and other default functions

  const location = search.value

  console.log(location)

  messageOne.textContent = 'Loading your forecast...'
  messageTwo.textContent = ''
  
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

// initially i added te script at the top. This provided me the error 'can't read property.


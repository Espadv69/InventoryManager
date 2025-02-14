document.querySelector('.addProduct-form').addEventListener('submit', async function(event) {
  event.preventDefault()

  // DOM elements
  const $inputName = document.querySelector('name')
  const $inputPrice = document.querySelector('.price')
  const $inputDescription = document.querySelector('.description')
  const $inputStock = document.querySelector('.stock')

  const name = $inputName.value
  const price = $inputPrice.value
  const description = $inputDescription.value
  const stock = $inputStock.value
})
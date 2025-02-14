document
  .querySelector('.addProduct-form')
  .addEventListener('submit', async function (event) {
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

    const product = { name, price, description, stock }

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })

    const data = await response.json()
    alert(data.message)
    loadProducts() // ToDo

    $inputName.value = ''
    $inputPrice.value = ''
    $inputDescription.value = ''
    $inputStock.value = ''
  })

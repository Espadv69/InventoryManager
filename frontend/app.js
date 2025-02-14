document
  .querySelector('.addProduct-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    // DOM elements
    const $inputName = document.querySelector('.name')
    const $inputPrice = document.querySelector('.price')
    const $inputDescription = document.querySelector('.description')
    const $inputStock = document.querySelector('.stock')

    const name = $inputName.value.trim()
    const price = parseFloat($inputPrice.value)
    const description = $inputDescription.value.trim()
    const stock = parseFloat($inputStock.value, 10)

    if (!name || isNaN(price) || isNaN(stock)) {
      alert('Please fill out all fields correctly.')
      return
    }

    const product = { name, price, description, stock }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        alert('Product added successfully!')
        document.querySelector('.addProduct-form').reset()
      } else {
        const errorData = await response.json()
        alert('Error: ' + errorData.message)
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Failed to add product.')
    }
  })

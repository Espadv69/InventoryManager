document
  .querySelector('.addProduct-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    // DOM elements
    const $inputName = document.querySelector('.name').value
    const $inputPrice = document.querySelector('.price').value
    const $inputDescription = document.querySelector('.description').value
    const $inputStock = document.querySelector('.stock').value

    const product = { $inputName, $inputPrice, $inputDescription, $inputStock }

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
        alert('Error:', errorData.message)
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Failed to add product.')
    }
  })

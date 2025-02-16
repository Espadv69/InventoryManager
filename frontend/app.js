loadProducts()

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
    loadProducts()
  })

async function loadProducts() {
  const response = await fetch('http://localhost:5000/api/products')
  const products = await response.json()

  const $productsList = document.querySelector('.productsList')
  $productsList.innerHTML = ''

  products.forEach((product) => {
    const $li = document.createElement('li')
    $li.textContent = `${product.name} - ${product?.description} - ${product.price} - ${product.stock}`

    // Create edit button
    const $editButton = document.createElement('button')
    $editButton.textContent = 'Edit'
    $editButton.addEventListener('click', () => editProduct)

    // Create delete button
    const $deleteButton = document.createElement('button')
    $deleteButton.textContent = 'Delete'
    $deleteButton.addEventListener('click', () => deleteProduct)

    $li.appendChild($editButton)
    $li.appendChild($deleteButton)
    $productsList.appendChild($li)
  })
}

// Delete Product
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this Product')) return

  try {
    const response = await fetch(`htpp://localhost:5000/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      alert('Product deleted successfully')
      loadProducts()
    } else {
      const errorData = await response.json()
      alert('Error: ' + errorData.message)
    }
  } catch (err) {
    console.error('Error:', err)
    alert('Failed to delete product.')
  }
}

// Edit product
async function editProduct(product) {
  const newName = prompt('Enter new name:', product.name)
  const newPrice = prompt('Enter new name:', product.price)
  const newDescription = prompt('Enter new name:', product.description)
  const newStock = prompt('Enter new name:', product.stock)

  if (!newName || isNaN(newPrice) || isNaN(newStock)) {
    alert('Invalid input. Please enter valid values.')
    return
  }

  const updatedProduct = {
    name: newName.trim(),
    price: parseFloat(newPrice),
    description: newDescription.trim(),
    stock: parseFloat(newStock, 10),
  }

  try {
    const response = await fetch(`http://localhost:5000/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    })

    if (response.ok) {
      alert('Product updated successfully!')
      loadProducts()
    } else {
      const errorData = await response.json()
      alert('Error: ' + errorData.message)
    }
  } catch (err) {
    console.error('Error:', err)
    alert('Failed to update product')
  }
}

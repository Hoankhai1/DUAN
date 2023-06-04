window.addEventListener('load', function () {
  var cartItems = localStorage.getItem("cartItems");
  var items = cartItems ? JSON.parse(cartItems) : [];

  var itemTable = document.getElementById("itemTable");
  var itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  var totalPrice = 0;

  items.forEach(function (item, index) {
    var row = document.createElement("tr");
    row.dataset.index = index;

    var imageCell = document.createElement("td");
    var image = document.createElement("img");
    image.src = item.image;
    image.alt = "Product Image";
    image.style.maxWidth = "100px";
    image.classList.add("cart-item-image");
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = item.productName;
    row.appendChild(nameCell);

    var priceCell = document.createElement("td");
    priceCell.textContent = "$" + item.price.toFixed(2);
    row.appendChild(priceCell);

    var sizeCell = document.createElement("td");
    sizeCell.textContent = item.size;
    row.appendChild(sizeCell);

    var colorCell = document.createElement("td");
    var colorDot = document.createElement("span");
    colorDot.classList.add("color-dot");
    colorDot.style.backgroundColor = item.color;
    colorCell.appendChild(colorDot);
    row.appendChild(colorCell);

    var actionCell = document.createElement("td");
    var removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () {
      removeCartItem(this);
    };
    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);

    itemList.appendChild(row);

    totalPrice += item.price * item.quantity;
  });

  function removeCartItem(button) {
    var row = button.parentNode.parentNode;
    var index = parseInt(row.dataset.index);

    // Remove the item from the cart
    items.splice(index, 1);

    // Update the localStorage with the modified cart items
    localStorage.setItem("cartItems", JSON.stringify(items));

    // Remove the row from the table
    row.remove();

    // Update the total price
    updateTotalPrice();
  }

  function updateTotalPrice() {
    totalPrice = 0;
    items.forEach(function (item) {
      totalPrice += item.price * item.quantity;
    });
    var totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = totalPrice.toFixed(2);
  }

  var totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.innerText = totalPrice.toFixed(2);
});
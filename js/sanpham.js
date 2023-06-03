window.addEventListener('load', function () {
  var cartItems = localStorage.getItem("cartItems");
  var items = cartItems ? JSON.parse(cartItems) : [];

  var totalQuantity = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  if (totalQuantity > 0) {
    var countItemElement = document.getElementById("countitem");
    countItemElement.innerText = totalQuantity;
  }
});

function addToCart(button) {
  

  var productName = button.getAttribute("product-name");
  var price = parseFloat(button.getAttribute("product-price"));
  var quantity = parseInt(document.querySelector('input[type="number"]').value);
  var size = document.getElementById("size").value;
  var image = button.getAttribute("product-image");
  var selectedColor = document.querySelector(".color-option.selected").style.backgroundColor;
  var cartItems = localStorage.getItem("cartItems");
  var items = cartItems ? JSON.parse(cartItems) : [];

  var existingItem = items.find(function (item) {
    return item.productName === productName && item.size === size;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({
      productName: productName,
      price: price,
      quantity: quantity,
      size: size,
      image: image,
      color: selectedColor
    });
  }
  location.reload()

  localStorage.setItem("cartItems", JSON.stringify(items));

  var itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  items.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.classList.add("cart-item");

    var image = document.createElement("img");
    image.src = item.image;
    image.alt = "Product Image";
    image.style.maxWidth = "100px";
    image.classList.add("cart-item-image");
    listItem.appendChild(image);

    var details = document.createElement("div");
    details.classList.add("cart-item-details");
    details.innerHTML = "<b>Name:</b> " + item.productName + ", <b>Price:</b> $" + item.price + ", <b>Quantity:</b> " + item.quantity + ", <b>Size:</b> " + item.size + ", <b>Color:</b> <span class='color-dot' style='background-color:" + item.color + ";'></span>";
    listItem.appendChild(details);

    itemList.appendChild(listItem);
  });

  var totalQuantity = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  var countItemElement = document.getElementById("countitem");
  countItemElement.innerText = totalQuantity;
 
}

function selectColor(colorOption) {
  var colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach(function (option) {
    option.classList.remove("selected");
  });
  colorOption.classList.add("selected");
}
document.getElementById("decrease").addEventListener("click", function () {
  const quantityInput = document.getElementById("quantity");
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantity--;
  }
  quantityInput.value = quantity;
});

document.getElementById("increase").addEventListener("click", function () {
  const quantityInput = document.getElementById("quantity");
  let quantity = parseInt(quantityInput.value);
  if (quantity < 100) {
    quantity++;
  }
  quantityInput.value = quantity;
});

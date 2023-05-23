function changeColor(button) {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] === button) {
      buttons[i].classList.add("red-button"); // Thêm lớp CSS "red-button" cho nút được nhấn
    } else {
      buttons[i].classList.remove("red-button"); // Xóa lớp CSS "red-button" cho nút không được nhấn
    }
  }
}
function changeSize(button) {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] === button) {
      buttons[i].classList.add("red1-button"); // Thêm lớp CSS "red-button" cho nút được nhấn
    } else {
      buttons[i].classList.remove("red1-button"); // Xóa lớp CSS "red-button" cho nút không được nhấn
    }
  }
}
function toggleImage() {
  var modal = document.getElementById('myModal');
  if (modal.style.display === "none") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}
window.addEventListener('load', function () {
  var cartItems = localStorage.getItem("cartItems");
  var items = cartItems ? JSON.parse(cartItems) : [];

  var totalQuantity = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  if (totalQuantity > 0) {
    // Nếu có món hàng trong giỏ, cập nhật số lượng trong phần "countitem"
    var countItemElement = document.getElementById("countitem");
    countItemElement.innerText = totalQuantity;
  }
});

function addToCart(button) {
  // Lấy thông tin sản phẩm từ thuộc tính tùy chỉnh của nút button
  var productName = button.getAttribute("product-name");
  var price = parseFloat(button.getAttribute("product-price"));
  var quantity = parseInt(document.querySelector('input[type="number"]').value);
  var image = button.getAttribute("product-image");
  // Lấy thông tin sản phẩm từ Local Storage (nếu có)
  var cartItems = localStorage.getItem("cartItems");
  var items = cartItems ? JSON.parse(cartItems) : [];

  var existingItem = items.find(function (item) {
    return item.productName === productName;
  });

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
    existingItem.quantity += quantity;
  } else {
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo mới và đặt số lượng
    items.push({
      productName: productName,
      price: price,
      quantity: quantity,
      image: image
    });
  }
  // Lưu thông tin sản phẩm vào Local Storage
  localStorage.setItem("cartItems", JSON.stringify(items));

  // Cập nhật số lượng món hàng trong giỏ hàng
  var itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  // Hiển thị lại danh sách sản phẩm trong giỏ hàng
  items.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.classList.add("cart-item");

    // Tạo phần tử hình ảnh và thêm vào listItem
    var image = document.createElement("img");
    image.src = item.image;
    image.alt = "Product Image";
    image.style.maxWidth = "100px";
    image.classList.add("cart-item-image");
    listItem.appendChild(image);

    // Tạo phần tử chi tiết sản phẩm và thêm vào listItem
    var details = document.createElement("div");
    details.classList.add("cart-item-details");
    details.innerHTML = "<b>Name:</b> " + item.productName + ", <b>Price:</b> $" + item.price + ", <b>Quantity:</b> " + item.quantity;
    listItem.appendChild(details);

    itemList.appendChild(listItem);
  });
  // Cập nhật số lượng món hàng trong phần "countitem"
  var totalQuantity = items.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  var countItemElement = document.getElementById("countitem");
  countItemElement.innerText = totalQuantity;
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


document.getElementById('save').addEventListener('click', function () {
  document.getElementById('notification').style.display = 'block';
});
document.getElementById('continue-shopping').addEventListener('click', function () {
  document.getElementById('notification').style.display = 'none';
});
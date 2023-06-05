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

  // if (existingItem) {
  //   // existingItem.quantity += quantity;
  // // } else {
  //   items.push({
  //     productName: productName,
  //     price: price,
  //     quantity: quantity,
  //     size: size,
  //     image: image,
  //     color: selectedColor
  //   });

  // }
  // location.reload()

  // localStorage.setItem("cartItems", JSON.stringify(items));
  if (existingItem) {
    // Kiểm tra xem có sản phẩm cùng tên và kích thước nhưng màu sắc khác không
    var differentColorItem = existingItem.color !== selectedColor;
    if (differentColorItem) {
      // Tạo một sản phẩm mới với màu sắc khác và thêm vào danh sách
      items.push({
        productName: productName,
        price: price,
        quantity: quantity,
        size: size,
        image: image,
        color: selectedColor
      });
    } else {
      // Tăng số lượng sản phẩm nếu sản phẩm cùng tên, kích thước và màu sắc
      existingItem.quantity += quantity;
    }
  } else {
    // Thêm sản phẩm mới vào danh sách
    items.push({
      productName: productName,
      price: price,
      quantity: quantity,
      size: size,
      image: image,
      color: selectedColor
    });
  }

  // Cập nhật danh sách sản phẩm trong Local Storage
  localStorage.setItem("cartItems", JSON.stringify(items));

  // Reload trang để cập nhật giao diện
  location.reload();
}

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

var countItemElement = document.getElementById("countitem");{
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

// Thêm hàm updateItemCount() để cập nhật số lượng hiển thị ngay lập tức
var quantityInput = document.getElementById("quantity");
updateItemCount();
// Gọi hàm updateItemCount() khi số lượng sản phẩm thay đổi
document.getElementById("quantity").addEventListener("input", updateItemCount);

function showImage() {
  var imageOverlay = document.getElementById("image-overlay");
  imageOverlay.style.display = "block"; // Hiển thị hình ảnh overlay
}

function hideImage() {
  var imageOverlay = document.getElementById("image-overlay");
  imageOverlay.style.display = "none"; // Ẩn hình ảnh overlay
}
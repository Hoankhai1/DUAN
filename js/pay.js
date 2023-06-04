var isLoggedIn = localStorage.getItem("isLoggedIn");

function pay() {
  // const giacuoi1 = document.querySelector('#totalPrice').textContent
  // console.log(giacuoi1)
  // localStorage.setItem('giacuoi', giacuoi1)
  if (isLoggedIn === "true") {
    // Nếu đã đăng nhập, hiển thị thông báo thành công
    alert("Payment successful!");
    localStorage.removeItem("cartItems");
    window.location.href = "http://127.0.0.1:5501/trangmuasam2.html";


    // Xoá các phần tử trong danh sách hiển thị giỏ hàng
    var itemList = document.getElementById("itemList");
    itemList.innerHTML = "";
  } else {
    // Nếu chưa đăng nhập, yêu cầu đăng nhập
    alert("Please login to proceed with payment.");
  }
}

// Lấy thông tin sản phẩm từ Local Storage và hiển thị nếu có
var cartItems = localStorage.getItem("cartItems");
var items = cartItems ? JSON.parse(cartItems) : [];
console.log(items)
document.getElementById('totalPrice').innerHTML=items[0].price

function updateTotalPrice() {
  var totalPrice = 0;
  var items = JSON.parse(localStorage.getItem("cartItems"));

  items.forEach(function (item) {
    totalPrice += item.price * item.quantity;
  });

  var totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.innerText = "Total: $" + totalPrice.toFixed(2);

  return totalPrice; // Trả về giá tổng để sử dụng khi cần thiết
}



function removeItem(index) {
  items.splice(index, 1); // Remove the item from the items array
  renderItems(); // Render the updated list of items
  document.getElementById("totalPrice").innerHTML = "Total: $" + updateTotalPrice(); // Update the total price

  // Save the updated cart items to localStorage
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function renderItems() {
  var itemList = document.getElementById("itemList");
  itemList.innerHTML = ""; // Xóa nội dung hiện tại của danh sách

  items.forEach(function (item, index) {
    // Tạo một hàng mới trong bảng
    var row = itemList.insertRow();

    // Tạo các ô trong hàng
    var actionCell = row.insertCell();
    var imageCell = row.insertCell();
    var nameCell = row.insertCell();
    var priceCell = row.insertCell();
    var colorCell = row.insertCell();
    var sizeCell = row.insertCell();
    var quantityCell = row.insertCell();
    var totalCell = row.insertCell();

    var quantityInput = document.createElement("input"); // Tạo input cho số lượng
    var removeButton = document.createElement("button"); // Nút xóa sản phẩm
    var colorDiv = document.createElement("div");

    // Thiết lập nội dung cho các ô
    nameCell.style.fontSize = "12px";
    /* Thêm các thuộc tính CSS khác tùy theo nhu cầu */

    nameCell.classList.add("product-name");
    var imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.classList.add("product-image");
    imageCell.appendChild(imageElement);
    nameCell.innerHTML = item.productName;
    priceCell.innerHTML = "$" + item.price;
    sizeCell.textContent = item.size
    console.log(JSON.stringify(item.price))

    // Tạo div chứa màu sắc của sản phẩm
    var color = item.color;
    console.log(color);
    var colorDiv = document.createElement("div");
    colorDiv.classList.add("color-option");
    colorDiv.style.backgroundColor = item.color;
    colorCell.appendChild(colorDiv);


    // Thiết lập thuộc tính cho input số lượng
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = 1; // Giá trị tối thiểu là 1
    quantityInput.classList.add("quantity-input");
    quantityInput.addEventListener("change", function () {
      input.addEventListener('input', function() {
        var index = parseInt(input.dataset.index);
        var quantity = parseInt(input.value);
    
        // Cập nhật số lượng sản phẩm trong items
        items[index].quantity = quantity;
    
        // Cập nhật giá theo số lượng
        items[index].price = items[index].initialPrice * quantity;
    
        // Cập nhật giá tổng
        updateTotalPrice();
    
        // Lưu sản phẩm và giá vào Local Storage
        localStorage.setItem("cartItems", JSON.stringify(items));
      });
    });
    
     
    // Thiết lập thuộc tính và sự kiện cho nút xóa sản phẩm
    removeButton.innerHTML = "X";
    removeButton.classList.add("removebutton");
    removeButton.addEventListener("click", function () {
      removeItem(index);
      updateTotalPrice(); // Cập nhật lại giá tổng
    });


    // Thêm nút xóa sản phẩm vào ô hành động
    actionCell.appendChild(removeButton);

    // Thêm input số lượng vào ô số lượng
    quantityCell.appendChild(quantityInput);

    // Thiết lập giá tổng ban đầu của sản phẩm
    totalCell.innerHTML = "$" + (item.price * item.quantity);
  });
}


renderItems();


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
  
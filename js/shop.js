function searchProducts() {
    var searchInput = document.getElementById("searchInput");
    var searchTerm = searchInput.value.toLowerCase();
    var products = document.getElementsByClassName("pro");

    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      var productName = product.getElementsByTagName("h5")[0].innerText.toLowerCase();

      if (productName.includes(searchTerm)) {
        product.classList.remove("hidden");
      } else {
        product.classList.add("hidden");
      }
    }
  }

  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", searchProducts);
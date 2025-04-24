function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + " ₫";
}

function parsePrice(priceString) {
  return parseInt(
    priceString.replace(/\./g, "").replace(" ₫", "").replace("₫", "")
  );
}

// Tải giỏ hàng từ localStorage
function loadCart() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const cart = JSON.parse(localStorage.getItem("cart"));
  const cartItemsContainer = document.getElementById("cart-items");
  const cartWithItems = document.getElementById("cart-with-items");
  const cartEmpty = document.getElementById("cart-empty");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartWithItems.style.display = "none";
    cartEmpty.style.display = "block";
    return;
  }

  cartWithItems.style.display = "block";
  cartEmpty.style.display = "none";

  let subtotal = 0;

  // Thêm các mục vào giỏ hàng
  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", item.id);

    const price = parsePrice(item.price);
    const total = price * item.quantity;
    subtotal += total;

    row.innerHTML = `
                <td data-label="Sản phẩm">
                    <img src="${item.imgSrc}" alt="${
      item.name
    }" class="product-image">
                </td>
                <td data-label="Tên sản phẩm">
                    <div class="product-name">${item.name}</div>
                </td>
                <td data-label="Giá">
                    <div class="product-price">${formatCurrency(price)}</div>
                </td>
                <td data-label="Số lượng">
                    <div class="quantity-control">
                        <div class="quantity-btn" onclick="decreaseQuantity('${
                          item.id
                        }')">-</div>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" class="quantity-input" onchange="updateQuantity('${
      item.id
    }', this.value)">
                        <div class="quantity-btn" onclick="increaseQuantity('${
                          item.id
                        }')">+</div>
                    </div>
                </td>
                <td data-label="Thành tiền">
                    <div class="product-price">${formatCurrency(total)}</div>
                </td>
                <td>
                    <button class="remove-btn" onclick="removeItem('${
                      item.id
                    }')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;

    cartItemsContainer.appendChild(row);
  });
  document.getElementById("subtotal").textContent = formatCurrency(subtotal);
  document.getElementById("total").textContent = formatCurrency(subtotal);
}

function increaseQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function decreaseQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    if (cart[productIndex].quantity > 1) {
      cart[productIndex].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      removeItem(productId);
      return;
    }
    loadCart();
  }
}

function updateQuantity(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    cart[productIndex].quantity = parseInt(quantity);

    if (cart[productIndex].quantity < 1) {
      cart[productIndex].quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const updatedCart = cart.filter((item) => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  loadCart();
}

function clearCart() {
  if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
    localStorage.setItem("cart", JSON.stringify([]));
    loadCart();
  }
}

function checkout() {
  alert("Chức năng thanh toán đang được phát triển!");
}

// Tải giỏ hàng khi tải trang
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});

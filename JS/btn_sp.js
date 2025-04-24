if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(element) {
  const productContainer = element.closest(".bg_sp");
  const imgSrc = productContainer.querySelector(".img-baosp img").src;
  const productName = productContainer
    .querySelector(".text-sp b")
    .innerText.trim();
  const productPrice = productContainer
    .querySelector(".price b")
    .innerText.trim();
  const specs = productContainer.querySelector(".thongso p").innerText.trim();
  const product = {
    id: generateProductId(productName),
    imgSrc: imgSrc,
    name: productName,
    price: productPrice,
    specs: specs,
    quantity: 1,
  };
  const cart = JSON.parse(localStorage.getItem("cart"));
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showAddToCartConfirmation(productName);
}

// Tạo ID sản phẩm đơn giản dựa trên tên
function generateProductId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .substring(0, 30);
}

// Hiển thị xác nhận khi thêm sản phẩm
function showAddToCartConfirmation(productName) {
  const notification = document.createElement("div");
  notification.classList.add("cart-notification");
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid fa-check"></i>
            <span>Đã thêm "${productName.substring(
              0,
              30
            )}..." vào giỏ hàng</span>
        </div>
    `;

  const style = document.createElement("style");
  style.innerHTML = `
        .cart-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
            animation-fill-mode: forwards;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification-content i {
            margin-right: 10px;
            font-size: 18px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
                display: none;
            }
        }
    `;

  document.head.appendChild(style);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 1000);

  updateCartCounter();
}

// Cập nhật số lượng hiển thị trên biểu tượng giỏ hàng
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartIcon = document.querySelector("#top-tops-topright a:nth-child(3)");

  if (cartIcon) {
    // Kiểm tra xem đã có bộ đếm chưa
    let counter = cartIcon.querySelector(".cart-counter");

    if (!counter && totalItems > 0) {
      counter = document.createElement("span");
      counter.classList.add("cart-counter");
      cartIcon.appendChild(counter);
      const style = document.createElement("style");
      style.innerHTML = `
                .cart-counter {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-color: red;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                #top-tops-topright a {
                    position: relative;
                }
            `;
      document.head.appendChild(style);
    }

    // Cập nhật văn bản của bộ đếm hoặc xóa nếu trống
    if (counter) {
      if (totalItems > 0) {
        counter.textContent = totalItems;
      } else {
        counter.remove();
      }
    }
  }
}

// Thêm sự kiện click cho tất cả các nút thêm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".a-them");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      addToCart(this);
    });
  });
  updateCartCounter();
});

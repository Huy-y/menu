// Danh sách đồ ăn (chỉ là một ví dụ)
const foodItems = [
    { name: "Mì Quảng", price: 50000, image: "./Images/Mi-quang-ha-noi-2.jpg" },
    { name: "Bánh Mì", price: 20000, image: "./Images/banh-mi.jpg" },
    { name: "Phở", price: 45000, image: "./Images/pho-bo-ha-noi.jpeg" },
    // Thêm các món đồ ăn khác ở đây
];

// Danh sách nước uống (chỉ là một ví dụ)
const drinkItems = [
    { name: "Coca Cola", price: 15000, image: "" },
    { name: "Trà đào", price: 20000, image: "" },
    { name: "Nước cam", price: 18000, image: "" },
    // Thêm các nước uống khác ở đây
];

// Hàm để tạo phần tử món đồ ăn
function createFoodItemCard(item) {
    const card = document.createElement("div");
    card.classList.add(
        "border-2",
        "menu-item",
        "bg-white",
        "rounded",
        "p-4",
        "shadow-md"
    );

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("item-image");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.classList.add("w-full", "h-45", "object-cover", "rounded", "ml-5", "items-center");
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info", "flex", "flex-col", "items-center");
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    itemName.classList.add("item-name", "text-lg", "font-bold", "mt-2");
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement("p");
    const formattedPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    itemPrice.textContent = `Giá: ${formattedPrice} VNĐ`;
    itemPrice.classList.add("item-price", "text-gray-600", "mt-2");
    itemInfo.appendChild(itemPrice);


    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity", "mt-2");
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add(
        "btn-quantity",
        "bg-red-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded",
        "mr-4"
    );
    decreaseBtn.onclick = () => decreaseQuantity(item, card);

    const quantityValue = document.createElement("span");
    quantityValue.textContent = "0";
    quantityValue.classList.add("item-quantity");
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add(
        "btn-quantity",
        "bg-green-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded",
        "ml-4"
    );
    increaseBtn.onclick = () => increaseQuantity(item, card);

    quantityContainer.appendChild(decreaseBtn);
    quantityContainer.appendChild(quantityValue);
    quantityContainer.appendChild(increaseBtn);

    itemInfo.appendChild(quantityContainer);

    card.appendChild(itemInfo);

    return card;
}


// Thêm các món đồ ăn vào tab "Đồ ăn"
const foodTab = document.getElementById("foodTab");
foodItems.forEach((item) => {
    const card = createFoodItemCard(item);
    foodTab.appendChild(card);
});

// Hàm để tạo phần tử nước uống
function createDrinkItemCard(item) {
    const card = document.createElement("div");
    card.classList.add(
        "menu-item",
        "bg-white",
        "rounded",
        "p-4",
        "shadow-md"
    );

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("item-image");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;
    image.classList.add("w-full", "h-40", "object-cover", "rounded");
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info", "flex", "flex-col", "items-center");
    const itemName = document.createElement("h3");
    itemName.textContent = item.name;
    itemName.classList.add("item-name", "text-lg", "font-bold", "mt-2");
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Giá: ${item.price} VNĐ`;
    itemPrice.classList.add("item-price", "text-gray-600", "mt-2");
    itemInfo.appendChild(itemPrice);

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity", "mt-2");
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.classList.add(
        "btn-quantity",
        "bg-red-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded",
        "mr-4"
    );
    decreaseBtn.onclick = () => decreaseQuantity(item, card);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = "0";
    quantityInput.min = "0";
    quantityInput.classList.add("item-quantity", "input-quantity");

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.classList.add(
        "btn-quantity",
        "bg-green-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded",
        "ml-4"
    );
    increaseBtn.onclick = () => increaseQuantity(item, card);
    quantityContainer.appendChild(decreaseBtn);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(increaseBtn);

    itemInfo.appendChild(quantityContainer);

    card.appendChild(itemInfo);

    return card;
}

// Thêm các nước uống vào tab "Nước"
const drinkTab = document.getElementById("drinkTab");
drinkItems.forEach((item) => {
    const card = createDrinkItemCard(item);
    drinkTab.appendChild(card);
});

// Hàm để thêm món vào giỏ hàng
function addToCart(name, price, quantity) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Kiểm tra xem món hàng đã tồn tại trong giỏ hàng chưa
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        // Nếu tồn tại rồi, cập nhật số lượng
        existingItem.quantity += quantity;
    } else {
        // Nếu chưa tồn tại, thêm mới món hàng vào giỏ hàng
        cartItems.push({ name, price, quantity });
    }

    // Loại bỏ các món hàng có số lượng là 0
    const updatedCartItems = cartItems.filter(item => item.quantity > 0);

    // Cập nhật giỏ hàng trong localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
}

// Hàm chuyển giữa các tab
function changeTab(tabName) {
    const tabs = document.querySelectorAll(".tab-button");
    tabs.forEach((tab) => tab.classList.remove("active"));

    const tabContent = document.querySelectorAll(".menu-items");
    tabContent.forEach((content) => content.classList.add("hidden"));

    const tabToShow = document.getElementById(`${tabName}Tab`);
    tabToShow.classList.remove("hidden");

    const activeTabBtn = document.querySelector(`button[data-tab='${tabName}']`);
    if (activeTabBtn) {
        activeTabBtn.classList.add("active");
    }
}

// Bắt sự kiện nhấn nút "Đồ ăn"
const foodTabBtn = document.querySelector("button[data-tab='food']");
foodTabBtn.onclick = function () {
    changeTab("food");
};

// Bắt sự kiện nhấn nút "Nước"
const drinkTabBtn = document.querySelector("button[data-tab='drink']");
drinkTabBtn.onclick = function () {
    changeTab("drink");
};

// Mặc định hiển thị tab "Đồ ăn"
changeTab("food");

// Các nút tăng giảm
function increaseQuantity(item, card) {
    const quantityInput = card.querySelector(".input-quantity");
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity.toString();

    addToCart(item.name, item.price, 1); // Thêm 1 vào giỏ hàng
}

function decreaseQuantity(item, card) {
    const quantityInput = card.querySelector(".input-quantity");
    let quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
        quantity--;
        quantityInput.value = quantity.toString();
        addToCart(item.name, item.price, -1); // Trừ 1 khỏi giỏ hàng
    }
    // Đặt lại số lượng thành 0 nếu số lượng đã giảm xuống 0
    if (quantity === 0) {
        quantityInput.value = "0";
        addToCart(item.name, item.price, -1); // Trừ 1 khỏi giỏ hàng
    }
}


function resetCart() {
    const quantityValues = document.querySelectorAll(".item-quantity");
    quantityValues.forEach(quantityValue => {
        quantityValue.textContent = "0";
    });

    localStorage.removeItem("cartItems");
}

// Hàm để gọi nhân viên
function callWaiter() {
    Swal.fire({
        title: "Vui lòng chờ",
        text: "Nhân viên đang tới chỗ bạn.",
        icon: "info",
        confirmButtonText: "OK"
    });
}

// Bắt sự kiện nhấn nút "Gọi nhân viên"
const callWaiterBtn = document.getElementById("callWaiterBtn");
callWaiterBtn.onclick = callWaiter;

// Hàm để tạo nội dung của giỏ hàng
function generateCartHTML(cartItems) {
    let cartHTML = '<table class="cart-table">';
    cartHTML += '<tr><th>Tên món</th><th>Số lượng</th><th>Tổng giá</th></tr>';

    let totalAmount = 0;

    cartItems.forEach(item => {
        const formattedPrice = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const formattedTotalPrice = (item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        cartHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formattedTotalPrice} VNĐ</td>
            </tr>
        `;
        totalAmount += item.price * item.quantity;
    });

    const formattedTotalAmount = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    cartHTML += '</table>';
    cartHTML += `<p class="total-amount">Tổng cộng: ${formattedTotalAmount} VNĐ</p>`;

    return cartHTML;
}

function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.forEach(item => {
        const itemRow = document.querySelector(`[data-item="${item.name}"]`);
        if (itemRow) {
            const quantityValue = itemRow.querySelector(".item-quantity");
            if (quantityValue) {
                quantityValue.textContent = item.quantity.toString();
            }
        }
    });
}

// Bắt sự kiện nhấn nút "Giỏ hàng" để hiển thị giỏ hàng
const cartBtn = document.getElementById("cartBtn");
cartBtn.addEventListener("click", showCart);

// Hàm để hiển thị giỏ hàng và bảng thanh toán
function showCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length === 0) {
        Swal.fire({
            title: "Giỏ hàng trống",
            text: "Không có món hàng trong giỏ hàng.",
            icon: "info",
            confirmButtonText: "OK",
            customClass: {
                content: 'small-swal-content' // Tạo một lớp CSS tên 'small-swal-content'
            }
        });
    } else {
        const cartHTML = generateCartHTML(cartItems);
        Swal.fire({
            title: "Giỏ hàng",
            html: cartHTML,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Thanh toán",
            cancelButtonText: "Tiếp tục mua sắm",
            customClass: {
                content: 'small-swal-content'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Thanh toán",
                    text: "Vui lòng chọn phương thức thanh toán",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "Thanh toán trực tiếp",
                    showDenyButton: true,
                    denyButtonText: "Thanh toán chuyển khoản",
                    cancelButtonText: "Hủy"
                }).then((paymentResult) => {
                    if (paymentResult.isConfirmed) {
                        Swal.fire({
                            text: "Vui lòng ra quầy thanh toán",
                            icon: "info"
                        })
                    } else if (paymentResult.isDenied) {
                        // Tạo một phần tử div để chứa cả văn bản và hình ảnh
                        const contentContainer = document.createElement("div");
                        contentContainer.classList.add("account-info");

                        // Tạo phần tử văn bản
                        const textElement = document.createElement("p");
                        textElement.innerHTML = "Trần Quang Huy<br><span class='account-number font-semibold'>9999998888805</span> - MB";
                        contentContainer.appendChild(textElement);

                        // Tạo phần tử hình ảnh
                        const imageElement = document.createElement("img");
                        imageElement.src = "Images/Ma-QR.png";
                        imageElement.alt = "Account Image";
                        imageElement.classList.add("account-image");
                        contentContainer.classList.add("center-content");
                        contentContainer.appendChild(imageElement);

                        Swal.fire({
                            title: "Thông tin",
                            icon: "info",
                            html: contentContainer.outerHTML,
                            confirmButtonText: "Ok",
                        });

                        // Thêm chức năng sao chép khi người dùng bấm vào số tài khoản
                        const accountNumberElement = document.querySelector(".account-number");
                        const clipboard = new ClipboardJS(accountNumberElement, {
                            text: function (trigger) {
                                return trigger.textContent;
                            }
                        });

                        clipboard.on("success", function (e) {
                            Swal.fire({
                                title: "Đã sao chép",
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                        });

                        clipboard.on("error", function (e) {
                            console.error("Lỗi khi sao chép: ", e);
                            Swal.fire({
                                title: "Lỗi",
                                text: "Đã xảy ra lỗi khi sao chép.",
                                icon: "error",
                                confirmButtonText: "OK",
                            });
                        });

                        accountNumberElement.addEventListener("click", function () {
                            clipboard.onClick({ currentTarget: accountNumberElement });
                        });
                    }

                });
            }
        });
    }
}

function pay() {
    // Thực hiện các thao tác thanh toán

    // Sau khi thanh toán thành công, đặt lại giỏ hàng
    resetCart();

    Swal.fire({
        title: "Thanh toán thành công",
        text: "Cảm ơn bạn đã thanh toán!",
        icon: "success",
        confirmButtonText: "OK"
    });
}

window.onload = function () {
    localStorage.removeItem("cartItems");
};

const themeToggle = document.getElementById("themeToggle");

// Sử dụng biến cờ để theo dõi trạng thái giao diện
let isDarkMode = false;

// Hàm để thay đổi giao diện
function toggleTheme() {
    const body = document.body;
    const tab = document.getElementById("tab");
    if (isDarkMode) {
        body.classList.remove("dark-mode");
        tab.classList.remove("dark-mode");
    } else {
        body.classList.add("dark-mode");
        tab.classList.add("dark-mode");
    }
    isDarkMode = !isDarkMode;
}

// Bắt sự kiện nhấn nút để thay đổi giao diện
themeToggle.addEventListener("click", toggleTheme);


// Hàm kiểm tra thời gian để xác định chế độ giao diện
function updateInterfaceMode() {
    const now = new Date();
    const currentHour = now.getHours();

    const body = document.querySelector("body");

    if (currentHour >= 18 || currentHour < 6) {
        // Thời gian từ 18h tối đến 6h sáng, sử dụng Dark Mode
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        tab.classList.add("dark-mode");
    } else {
        // Các thời gian khác, sử dụng Light Mode
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        tab.classList.remove("dark-mode");
    }
}

// Gọi hàm để cập nhật giao diện ban đầu
updateInterfaceMode();

// Cập nhật giao diện theo thời gian
setInterval(updateInterfaceMode, 60000); // Cập nhật mỗi phút

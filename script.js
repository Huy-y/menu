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

// Thêm các nước uống vào tab "Nước"
const drinkTab = document.getElementById("drinkTab");
drinkItems.forEach((item) => {
    const card = createDrinkItemCard(item);
    drinkTab.appendChild(card);
});

// Hàm thêm món vào giỏ hàng
function addToCart(name, price) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push({ name, price });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Đã thêm vào giỏ hàng!");
}

// Hàm chuyển giữa các tab
function changeTab(tabName) {
    const tabs = document.querySelectorAll(".tab-button");
    tabs.forEach((tab) => tab.classList.remove("active"));

    const tabContent = document.querySelectorAll(".menu-items");
    tabContent.forEach((content) => content.classList.add("hidden"));

    if (tabName === "food") {
        document.getElementById("foodTab").classList.remove("hidden");
        document.querySelector("button[data-tab='food']").classList.add("active");
    } else if (tabName === "drink") {
        document.getElementById("drinkTab").classList.remove("hidden");
        document.querySelector("button[data-tab='drink']").classList.add("active");
    }
}

// Mặc định hiển thị tab "Đồ ăn"
changeTab("food");

// Hàm tăng số lượng món đồ ăn
function increaseQuantity(item, card) {
    const quantityElement = button.parentElement.querySelector(".item-quantity");
    let quantity = parseInt(quantityElement.textContent, 10);
    quantity++;
    quantityElement.textContent = quantity.toString();
}

// Hàm giảm số lượng món đồ ăn
function decreaseQuantity(item, card) {
    const quantityElement = button.parentElement.querySelector(".item-quantity");
    let quantity = parseInt(quantityElement.textContent, 10);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity.toString();
    }
}

// Gọi nhân viên (sử dụng SweetAlert2)
document.getElementById("callWaiter").addEventListener("click", () => {
    Swal.fire({
        icon: "info",
        title: "Gọi nhân viên",
        text: "Nhân viên sẽ đến ngay!",
    });
});

// Xem giỏ hàng (sử dụng SweetAlert2)
document.getElementById("viewCart").addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartContent = "<ul>";
    cartItems.forEach((item) => {
        cartContent += `<li>${item.name} - ${item.price} VNĐ</li>`;
    });
    cartContent += "</ul>";

    Swal.fire({
        icon: "success",
        title: "Giỏ hàng",
        html: cartContent,
    });
});

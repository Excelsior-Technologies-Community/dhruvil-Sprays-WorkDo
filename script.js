const images = [
  "./assets/images/imgi_39_1_9fb478e8-5bf8-47b2-8632-27e5c0519a52_600x600.png",
  "./assets/images/imgi_40_1_f89b722a-1739-4b59-9ff9-fbc612c7ab3b_600x600.png",
  "./assets/images/imgi_41_1_6797f7be-438d-42cd-b925-e1765472a361_600x600.png",
];

const hoverImages = [
  "./assets/images/imgi_50_2_0fd5c05a-db0a-46e5-a4a4-f43e86a179c1_600x600.png",
  "./assets/images/imgi_51_2_9f32f89b-6c0a-431c-8219-f977cd60e07d_600x600.png",
  "./assets/images/imgi_49_2_bdea8612-3d08-4f82-ba03-3541ab67020d_600x600.png",
];

let index = 0;

const img = document.getElementById("productImage");
const indexSpans = document.querySelectorAll("#indexes span");

function showImage() {
  img.src = images[index];
  updateIndex();
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

function updateIndex() {
  indexSpans.forEach((span, i) => {
    span.classList.remove("text-white");
    span.classList.add("text-black");

    if (i === index) {
      span.classList.add("text-white");
      span.classList.remove("text-black");
    }
  });
}

function setImage(i) {
  index = i;
  showImage();
}

img.addEventListener("mouseenter", () => {
  img.src = hoverImages[index];
});

img.addEventListener("mouseout", () => {
  img.src = images[index];
});

showImage();

let total = localStorage.getItem("cartTotal")
  ? parseInt(localStorage.getItem("cartTotal"))
  : 0;

updateDisplay();

const cards = document.querySelectorAll(".cartDiv");

cards.forEach((card) => {
  const btn = card.querySelector(".addCart");

  btn.addEventListener("click", () => {
    const name = card.querySelector("h2").textContent;
    const image = card.querySelector(".productImage").src;
    const priceText = card.querySelector(".total").textContent;

    const price = parseInt(priceText.replace("$", ""));

    total += price;
    localStorage.setItem("cartTotal", total);

    displayCartItem(name, image, priceText);
    updateDisplay();
    updateTotalCartValue();
  });
});

function updateDisplay() {
  document.getElementById("cartValue").textContent = `$${total}.00`;
}

function updateTotalCartValue() {
  document.querySelector(".cartTotalValue").textContent = `Total: $${total}.00`;
}

function displayCartItem(name, image, priceText) {
  const cartList = document.getElementById("cartList");

  const existing = [...cartList.children].find(
    (item) => item.dataset.name === name,
  );

  if (existing) {
    const qtyEl = existing.querySelector(".qty");
    qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
    return;
  }

  cartList.innerHTML += `
    <div class="flex  items-center gap-3 p-2 border-b"
         data-name="${name}">
      <img src="${image}" class="w-12 h-12"/>
      <p>${name}</p>
      <p>${priceText}</p>
      <p>Qty: <span class="qty">1</span></p>
    </div>
  `;
}

const InfinteHoverImage = [
  "./assets/images/imgi_50_2_0fd5c05a-db0a-46e5-a4a4-f43e86a179c1_600x600.png",
  "./assets/images/imgi_51_2_9f32f89b-6c0a-431c-8219-f977cd60e07d_600x600.png",
  "./assets/images/imgi_49_2_bdea8612-3d08-4f82-ba03-3541ab67020d_600x600.png",
  "./assets/images/imgi_53_2_58fb376a-3871-47ea-9f91-439c0b1f556f_600x600.png",
];

const InfinteImage = [
  "./assets/images/imgi_39_1_9fb478e8-5bf8-47b2-8632-27e5c0519a52_600x600.png",
  "./assets/images/imgi_40_1_f89b722a-1739-4b59-9ff9-fbc612c7ab3b_600x600.png",
  "./assets/images/imgi_41_1_6797f7be-438d-42cd-b925-e1765472a361_600x600.png",
  "./assets/images/imgi_42_1_a7608a96-770b-4702-bfbb-a8086da3cf12_600x600.png",
];

const productImages = document.querySelectorAll('[id^="productImages"]');

productImages.forEach((img) => {
  const index = parseInt(img.dataset.index);

  img.addEventListener("mouseenter", () => {
    img.src = InfinteHoverImage[index];
  });

  img.addEventListener("mouseout", () => {
    img.src = InfinteImage[index];
  });
});

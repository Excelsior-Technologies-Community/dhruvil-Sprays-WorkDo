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

function addtoCart() {
  total += 20;
  localStorage.setItem("cartTotal", total);
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("cartValue").textContent = `$${total}.00`;
}

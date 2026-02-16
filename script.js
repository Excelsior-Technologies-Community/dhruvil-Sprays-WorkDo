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

let total = 0;

updateDisplay();

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".addCart");
  if (!btn) return;

  const card = btn.closest(".cartDiv, .ladyPerfume, .heroProduct");
  if (!card) return;

  const nameEl = card.querySelector("h2");
  const priceEl = card.querySelector(".total");
  const imgEl = card.querySelector(
    "#productImage, .productImage, .versalityProductImage, img",
  );

  if (!nameEl || !priceEl) return;

  const name = nameEl.textContent.trim();
  const priceText = priceEl.textContent.trim();
  const price = parseInt(priceText.replace(/[$,]/g, ""), 10) || 0;
  const image = imgEl ? imgEl.src || imgEl.getAttribute("src") || "" : "";

  total += price;
  addOrUpdateCartItem(name, image, price);
  updateDisplay();
  updateTotalCartValue();
});

function updateDisplay() {
  document.getElementById("cartValue").textContent = `$${total}.00`;
}

function updateTotalCartValue() {
  document.querySelector(".cartTotalValue").textContent = `Total: $${total}.00`;
}

function addOrUpdateCartItem(name, image, price) {
  const cartList = document.getElementById("cartList");

  const existing = [...cartList.children].find(
    (item) => item.dataset.name === name,
  );

  if (existing) {
    const qtyEl = existing.querySelector(".qty");
    let qty = parseInt(qtyEl.textContent);
    qty++;
    qtyEl.textContent = qty;

    return;
  }

  const div = document.createElement("div");
  div.className = "flex items-center gap-3 p-2 border-b";
  div.dataset.name = name;
  div.dataset.price = price; // store price

  const deleteimage = "./assets/images/download (22).svg";

  div.innerHTML = `
    <img src="${image}" class="w-12 h-12 object-contain"/>
    <div class="flex-1">
      <p class="font-semibold">${name}</p>
      <p>$${price}.00</p>
    </div>
    <p>Qty: <span class="qty">1</span></p>
    <button class="delete-btn">
      <img src="${deleteimage}" class="w-4 h-4"/>
    </button>
  `;

  div.querySelector(".delete-btn").onclick = function () {
    const qty = parseInt(div.querySelector(".qty").textContent);
    const itemPrice = parseInt(div.dataset.price);

    // subtract from total
    total -= itemPrice * qty;

    updateDisplay();
    updateTotalCartValue();

    // remove from DOM
    div.remove();
  };

  cartList.appendChild(div);
}

const InfinteHoverImage = [
  "./assets/images/imgi_50_2_0fd5c05a-db0a-46e5-a4a4-f43e86a179c1_600x600.png",
  "./assets/images/imgi_51_2_9f32f89b-6c0a-431c-8219-f977cd60e07d_600x600.png",
  "./assets/images/imgi_49_2_bdea8612-3d08-4f82-ba03-3541ab67020d_600x600.png",
  "./assets/images/imgi_53_2_58fb376a-3871-47ea-9f91-439c0b1f556f_600x600.png",
  "./assets/images/imgi_50_2_0fd5c05a-db0a-46e5-a4a4-f43e86a179c1_600x600.png",
];

const InfinteImage = [
  "./assets/images/imgi_39_1_9fb478e8-5bf8-47b2-8632-27e5c0519a52_600x600.png",
  "./assets/images/imgi_40_1_f89b722a-1739-4b59-9ff9-fbc612c7ab3b_600x600.png",
  "./assets/images/imgi_41_1_6797f7be-438d-42cd-b925-e1765472a361_600x600.png",
  "./assets/images/imgi_42_1_a7608a96-770b-4702-bfbb-a8086da3cf12_600x600.png",
  "./assets/images/imgi_39_1_9fb478e8-5bf8-47b2-8632-27e5c0519a52_600x600.png",
];

const productImages = document.querySelectorAll(".productImage");

productImages.forEach((img) => {
  const index = parseInt(img.dataset.index);

  img.addEventListener("mouseenter", () => {
    img.src = InfinteHoverImage[index];
  });

  img.addEventListener("mouseout", () => {
    img.src = InfinteImage[index];
  });
});

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 25,
    loop: true,
    loopedSlides: 5,
    loopAdditionalSlides: 5,
    watchOverflow: false,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Last section: 2 slides visible, 1 hidden; arrow click reveals next with loop
  new Swiper(".uniqueSwiper", {
    slidesPerView: 2,
    spaceBetween: 24,
    loop: true,
    loopedSlides: 3,
    navigation: {
      nextEl: ".uniqueSwiper-next",
      prevEl: ".uniqueSwiper-prev",
    },
  });
});

const versalityImage = [
  "./assets/images/imgi_48_1_9a6876b2-beae-4ed4-af95-1331900080eb_600x600.png",
  "./assets/images/imgi_43_1_540a9dd3-b974-41ff-8346-0dc24fac402d_600x600.png",
  "./assets/images/imgi_45_1_5087c1d9-362a-420a-a8d0-e2fa35f0b92b_600x600.png",
];

const versalityHoverImage = [
  "./assets/images/imgi_58_2_b73caffe-8acf-46f9-a49d-228b958e2609_600x600.png",
  "./assets/images/imgi_44_2_5d7f7c06-056c-4471-b62f-78fdb174ffe7_600x600.png",
  "./assets/images/imgi_54_2_6e9dd3e5-441e-47db-9286-6b14dc374a56_600x600.png",
];

const versalityData = [
  {
    brand: "Swiss",
    title: "Valaya Eau de Perfume",
  },
  {
    brand: "Swiss",
    title: "Orina Eay De Perfume",
  },
  {
    brand: "Swiss",
    title: "Delina Ra Dose Perfume",
  },
  {
    brand: "Swiss",
    title: "Delina Ra Dose Perfume",
  },
];

const versalityProductImage = document.querySelectorAll(
  ".versalityProductImage",
);

versalityProductImage.forEach((img) => {
  const index = parseInt(img.dataset.index);

  img.addEventListener("mouseenter", () => {
    img.src = versalityHoverImage[index];
  });
  img.addEventListener("mouseleave", () => {
    img.src = versalityImage[index];
  });
});

const versality = document.querySelectorAll(".ladyPerfume");

versality.forEach((card, i) => {
  if (versalityData[i]) {
    card.querySelector("p").textContent = versalityData[i].brand;
    card.querySelector("h2").textContent = versalityData[i].title;
  }
});

const icons = document.querySelectorAll(".handbagIcon");

icons.forEach((icon) => {
  icon.parentElement.addEventListener("mouseenter", () => {
    icon.src = "./assets/images/handbag.png";
  });

  icon.parentElement.addEventListener("mouseleave", () => {
    icon.src = "./assets/images/download (34).svg";
  });
});

const unisexData = [
  {
    img: "./assets/images/imgi_67_1_66310d0e-ae9b-4e57-ac4f-37dbe594ba95_600x600.png",
    brand: "Arabic",
    text: "Dolce&Gabbban De Perfume",
    hover:
      "./assets/images/imgi_68_2_d4b60e26-1d9b-4251-b42a-e6f1b17aa127_600x600.png",
  },
  {
    img: "./assets/images/imgi_61_1_5df8b6cd-d00e-42c6-b9fe-445ab98d2ba8_600x600.png",
    brand: "Arabic",
    text: "Colong Sophher Sea",
    hover:
      "./assets/images/imgi_62_2_fd7a60cf-b793-4089-948e-65c3101347df_600x600.png",
  },
  {
    img: "./assets/images/imgi_65_1_d2d78a26-cbfc-4523-a34f-8caae16d7d60_600x600.png",
    brand: "Arabic",
    text: "Colong To The Races",
    hover:
      "./assets/images/imgi_66_2_fcdfa7d3-183b-40f8-a409-68e6ec449333_600x600.png",
  },
  {
    img: "./assets/images/imgi_59_1_85f16b05-1187-4a35-978f-0edaa3cc84f9_600x600.png",
    brand: "Arabic",
    text: "Colong To The Races",
    hover:
      "./assets/images/imgi_60_2_01ee1320-8362-48af-b5a5-b806a3494e8c_600x600.png",
  },
];

// Versality filter: keep one tab active (black bg), others inactive (white bg)
function setVersalityActive(activeBtn) {
  const allBtns = document.querySelectorAll(".versalityFilterBtn");
  const handbagPath = "./assets/images/handbag.png";
  const defaultIconPath = "./assets/images/download (34).svg";

  allBtns.forEach((btn) => {
    const icon = btn.querySelector(".handbagIcon");
    if (btn === activeBtn) {
      btn.classList.remove("bg-white", "text-black");
      btn.classList.add("bg-black", "text-white");
      if (icon) icon.src = handbagPath;
    } else {
      btn.classList.remove("bg-black", "text-white");
      btn.classList.add("bg-white", "text-black");
      if (icon) icon.src = defaultIconPath;
    }
  });
}

const unisex = document.getElementById("unisexBtn");

unisex.addEventListener("click", (e) => {
  e.preventDefault();

  setVersalityActive(unisex);

  const cards = document.querySelectorAll(".ladyPerfume");

  cards.forEach((card, i) => {
    if (unisexData[i]) {
      const img = card.querySelector("img");

      img.src = unisexData[i].img;
      card.querySelector("p").textContent = unisexData[i].brand;
      card.querySelector("h2").textContent = unisexData[i].text;
      const priceSpan = card.querySelector(".total");
      if (priceSpan) priceSpan.textContent = "$50.00";

      card.addEventListener("mouseenter", () => {
        img.src = unisexData[i].hover;
      });

      card.addEventListener("mouseleave", () => {
        img.src = unisexData[i].img;
      });
    }
  });
});

const unisexBtn = document.getElementById("unisexBtn");

const solidBtn = document.getElementById("solidBtn");
const solidData = [
  {
    img: "./assets/images/imgi_69_1_ccd8c110-4c47-4b42-a8f9-5497d57341b8_600x600.png",
    brand: "Rihana",
    text: "Valvet oud Eau De ",
    hover:
      "./assets/images/imgi_70_2_0a96e571-03f6-4722-8d50-7a599dadd27f_600x600.png",
  },
  {
    img: "./assets/images/imgi_73_1_2d185b68-6bcf-4c58-8ead-ac10508eb9eb_600x600.png",
    brand: "Rihana",
    text: "Royal Musk Eau De ",
    hover:
      "./assets/images/imgi_74_2_a7604a8d-31b4-4358-b398-b9b2b1c2cb82_600x600.png",
  },
  {
    img: "./assets/images/imgi_71_1_1d303688-f433-4914-a32b-de7a7a050bb9_600x600.png",
    brand: "Rihana",
    text: "Nuit intense Eau De ",
    hover:
      "./assets/images/imgi_72_2_b1de8c97-b2e8-4d6b-9e4a-259c53845a76_600x600.png",
  },
  {
    img: "./assets/images/imgi_77_1_e1abb872-35be-470a-b3e7-3c42bacc6567_600x600.png",
    brand: "Rihana",
    text: "Fusion Aquo Eau De ",
    hover:
      "./assets/images/imgi_78_2_a5a2fd15-9c7d-411d-b204-decded324f62_600x600.png",
  },
];

if (solidBtn) {
  solidBtn.addEventListener("click", (e) => {
    e.preventDefault();

    setVersalityActive(solidBtn);

    const solidcard = document.querySelectorAll(".ladyPerfume");

    solidcard.forEach((card, i) => {
      if (solidData[i]) {
        const img = card.querySelector("img");

        img.src = solidData[i].img;
        card.querySelector("p").textContent = solidData[i].brand;
        card.querySelector("h2").textContent = solidData[i].text;
        const priceSpan = card.querySelector(".total");
        if (priceSpan) priceSpan.textContent = "$60.00";

        card.addEventListener("mouseenter", () => {
          img.src = solidData[i].hover;
        });

        card.addEventListener("mouseout", () => {
          img.src = solidData[i].img;
        });
      }
    });
  });
}

// Fragrance (default) tab: reset cards to versality content
const fragranceBtn = document.getElementById("fragranceBtn");
if (fragranceBtn) {
  fragranceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setVersalityActive(fragranceBtn);

    const cards = document.querySelectorAll(".ladyPerfume");
    cards.forEach((card, i) => {
      if (versalityData[i]) {
        card.querySelector("p").textContent = versalityData[i].brand;
        card.querySelector("h2").textContent = versalityData[i].title;
        const img = card.querySelector(".versalityProductImage");
        if (img && versalityImage[i]) img.src = versalityImage[i];
        const priceSpan = card.querySelector(".total");
        if (priceSpan) priceSpan.textContent = "$20.00";
      }
    });
  });
}

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  const cart = document.getElementById("cart");
  const cartTrigger = document.getElementById("cartTrigger");
  if (
    cart &&
    cartTrigger &&
    !cart.classList.contains("hidden") &&
    !cart.contains(e.target) &&
    !cartTrigger.contains(e.target)
  ) {
    cart.classList.add("hidden");
  }
});

// const arrowImage = document.getElementById("arrowImg");

// arrowImage.addEventListener("mouseover", () => {
//   arrowImage.src = "assets/images/download (49).svg";

//   arrowImage.addEventListener("mouseout", () => {
//     arrowImage.src = "assets/images/download (2).svg";
//   });
// });

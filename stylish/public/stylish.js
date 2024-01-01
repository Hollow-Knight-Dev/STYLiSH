function getUrlParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

function showLoading() {
  const loading = document.getElementsByClassName("loader")[0];
  loading.style.display = "block";
}

function hideLoading() {
  const loading = document.getElementsByClassName("loader")[0];
  loading.style.display = "none";
}

function redirectToHomePage() {
  window.location.href = "index.html";
}

function clearRender() {
  const mainContent = document.querySelector(".main-content");
  const productGridContainer = mainContent.querySelector(".grid");
  productGridContainer.innerHTML = ``;
}

function renderData(data) {
  const mainContent = document.querySelector(".main-content");
  const productGridContainer = mainContent.querySelector(".grid");
  const productArray = data.data;

  productArray.forEach((product) => {
    const productElement = document.createElement("a");
    productElement.className = "product";
    productElement.href = `/product/${product.id}`;

    const productDescription = document.createElement("div");
    productDescription.className = "product-description";

    const productColorOption = document.createElement("div");
    productColorOption.className = "color-option";

    const colorOption = [];
    product.colors.forEach((color) => {
      let colorCode;
      colorCode = `#${color.code}`;
      colorOption.push(colorCode);
    });
    colorOption.forEach((colorCode) => {
      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = colorCode;
      productColorOption.appendChild(colorBox);
    });
    productDescription.appendChild(productColorOption);

    const productTitle = document.createElement("p");
    productTitle.className = "product-text";
    productTitle.textContent = product.title;
    productDescription.appendChild(productTitle);

    const productPrice = document.createElement("p");
    productPrice.className = "product-text";
    productPrice.textContent = `TWD.${product.price}`;
    productDescription.appendChild(productPrice);

    productElement.innerHTML = `<img src="${product.main_image}" alt="${product.title}">`;
    productElement.appendChild(productDescription);
    productGridContainer.appendChild(productElement);
  });
}

function fetchAndRenderCampaign(api, callback) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const campaignContainer = document.querySelector(".carousel");
      const slideContainer = document.querySelector(".slide-container");
      const dotsContainer = document.querySelector(".carousel-dots");
      const campaigntArray = data.data;

      campaigntArray.forEach((campaign) => {
        const a = document.createElement("a");
        a.href = `/product/${campaign.product_id}`;
        a.className = "slide";

        const img = document.createElement("img");
        img.src = campaign.picture;
        img.alt = `product id: ${campaign.product_id}`;
        img.className = "campaign-image";
        a.appendChild(img);

        const slideText = document.createElement("div");
        slideText.className = "slide-text";
        let slogan = campaign.story;
        const parts = slogan.split("\r\n");
        const bigText = document.createElement("p");
        bigText.className = "slide-text-big";
        bigText.innerHTML = parts[0] + "<br>" + parts[1] + "<br>" + parts[2];
        const smallText = document.createElement("p");
        smallText.className = "slide-text-small";
        smallText.textContent = parts[3];
        slideText.appendChild(bigText);
        slideText.appendChild(smallText);
        a.appendChild(slideText);

        const spanElement = document.createElement("span");
        spanElement.className = "carousel-dot";
        dotsContainer.appendChild(spanElement);

        slideContainer.appendChild(a);
      });
      campaignContainer.appendChild(slideContainer);
      campaignContainer.appendChild(dotsContainer);

      if (typeof callback === "function") {
        callback();
      }
    });
}

function initializeCarousel() {
  const carousel = document.querySelector(".carousel");
  const slideContainer = document.querySelector(".slide-container");
  const dots = document.querySelectorAll(".carousel-dot");
  dots[0].classList.add("active-dot");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slideContainer.style.transform = `translateX(${index * -100}%)`;
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active-dot");
      } else {
        dot.classList.remove("active-dot");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % dots.length;
    showSlide(currentSlide);
  }

  function startTimer() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopTimer() {
    clearInterval(slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      currentSlide = index;
    });
  });

  carousel.addEventListener("mouseenter", stopTimer);
  carousel.addEventListener("mouseleave", startTimer);

  startTimer();
}

let currentPage = 0;
let nextPage = false;
let isFinishLoading = false;
let lastPage = false;

function resetPageTracker() {
  currentPage = 0;
  nextPage = false;
  lastPage = false;
  isFinishLoading = false;
}

function fetchApi(api, callback) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if ("next_paging" in data) {
        nextPage = data.next_paging;
      } else {
        nextPage = false;
        lastPage = true;
      }

      renderData(data);
      if (typeof callback === "function") {
        callback();
      }
      hideLoading();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function finishLoadProducts() {
  const mainContent = document.querySelector(".main-content");
  const productGridContainer = mainContent.querySelector(".grid");
  const scrollTopButton = document.createElement("button");
  scrollTopButton.className = "scroll-top-button";
  scrollTopButton.textContent = "回頂端";
  productGridContainer.appendChild(scrollTopButton);
  scrollTopButton.addEventListener("click", resetPagePosition);
}

function resetPagePosition() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function updateCartCount() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cartData.reduce((total, item) => total + item.qty, 0);
  const cartCountElement = document.querySelector(".cart-count");
  cartCountElement.textContent = totalQuantity.toString();
}

const apiMain = "https://api.appworks-school.tw/api/1.0";

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  const campaignApiEndpoint = `${apiMain}/marketing/campaigns`;
  fetchAndRenderCampaign(campaignApiEndpoint, initializeCarousel);

  const navItems = document.querySelectorAll(".nav-item");
  const categoryList = ["all", "women", "men", "accessories"];

  function loadProducts(category, page) {
    if (page === undefined) {
      clearRender();
      const apiEndpoint = `${apiMain}/products/${category}`;
      fetchApi(apiEndpoint);
    } else {
      const apiEndpoint = `${apiMain}/products/${category}?paging=${page}`;
      fetchApi(apiEndpoint);
    }
  }

  let activeNavItem = null;
  navItems.forEach((link) => {
    link.classList.remove("nav-text-active");
    link.addEventListener("click", function (e) {
      e.preventDefault();
      resetPageTracker();
      resetPagePosition();

      const category = this.dataset.category;
      history.pushState(null, null, `index.html?category=${category}`);
      loadProducts(category);

      if (activeNavItem) {
        activeNavItem.classList.remove("nav-text-active");
      }

      link.classList.add("nav-text-active");
      activeNavItem = link;
    });
  });

  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  let searchBarVisisble = false;

  function toggleSearchBar() {
    if (searchBarVisisble) {
      searchInput.style.display = "none";
      document.querySelector(".header-part2").style.zIndex = "1";
      document.querySelector(".search-container").style.border = "0";
    } else {
      searchInput.style.display = "block";
      document.querySelector(".header-part2").style.zIndex = "2";
      document.querySelector(".search-container").style.border =
        "1px solid #979797";
    }
    searchBarVisisble = !searchBarVisisble;
  }

  function resetSearchBar() {
    searchInput.value = "";
    searchInput.placeholder = "搜尋商品";
  }

  searchIcon.addEventListener("mouseover", () => {
    searchIcon.src = "images/search-hover.png";
  });

  searchIcon.addEventListener("mouseout", () => {
    searchIcon.src = "images/search.png";
  });

  searchIcon.addEventListener("click", toggleSearchBar);

  searchInput.addEventListener("focus", () => {
    searchInput.placeholder = "";
  });

  searchInput.addEventListener("blur", () => {
    searchInput.placeholder = "搜尋商品";
  });

  function showNoSearchResult() {
    const mainContent = document.querySelector(".main-content");
    const productGridContainer = mainContent.querySelector(".grid");
    if (productGridContainer.innerHTML === "") {
      const noRelatedProductsTitle = document.createElement("h4");
      noRelatedProductsTitle.textContent = "No related products.";
      productGridContainer.appendChild(noRelatedProductsTitle);
    }
  }

  function loadSearch(searchTerm) {
    clearRender();
    const apiEndpoint = `${apiMain}/products/search?keyword=${searchTerm}`;
    fetchApi(apiEndpoint, showNoSearchResult);
  }

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    resetPagePosition();
    if (searchTerm === "") {
      location.reload();
    } else {
      history.pushState(null, null, `index.html?keyword=${searchTerm}`);
      loadSearch(searchTerm);
    }
  }

  searchIcon.addEventListener("click", () => {
    if (searchInput.value) {
      performSearch();
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  function hasQueryParameter(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.has(paramName);
  }

  const categoryParam = getUrlParam("category");
  const keywordParam = getUrlParam("keyword");
  if (categoryParam === null && keywordParam === null) {
    loadProducts("all");
  }
  if (hasQueryParameter("category")) {
    const categoryParam = getUrlParam("category");
    if (!categoryParam || !categoryList.includes(categoryParam)) {
      redirectToHomePage();
      resetPagePosition();
    } else {
      clearRender();
      resetPagePosition();
      loadProducts(categoryParam);
    }
  } else if (hasQueryParameter("keyword")) {
    const keywordParam = getUrlParam("keyword");
    resetPagePosition();
    loadSearch(keywordParam);
  }

  window.addEventListener("popstate", function (event) {
    resetPageTracker();
    resetPagePosition();
    if (hasQueryParameter("category")) {
      const categoryParam = getUrlParam("category");
      if (categoryParam === null) {
        loadProducts("all");
      } else {
        loadProducts(categoryParam);
      }
    } else if (hasQueryParameter("keyword")) {
      const keywordParam = getUrlParam("keyword");
      loadSearch(keywordParam);
      resetSearchBar();
    } else {
      redirectToHomePage();
    }
  });

  function isNearBottom() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;
    return scrollTop + windowHeight >= pageHeight - 200;
  }

  window.addEventListener("scroll", function () {
    const categoryParam = getUrlParam("category");
    if (isNearBottom()) {
      if (lastPage && !isFinishLoading) {
        finishLoadProducts();
        isFinishLoading = true;
      } else if (currentPage !== nextPage && nextPage) {
        currentPage = nextPage;
        if (categoryParam === null) {
          loadProducts("all", currentPage);
        } else {
          loadProducts(categoryParam, currentPage);
        }
      }
    }
  });

  const cart = document.getElementsByClassName("cart")[0];
  cart.addEventListener("click", () => {
    window.location.href = "/checkout";
  });
});

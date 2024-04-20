const url =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

const itemData = await fetch(url)
  .then((response) => response.json())
  .then((data) => data);

const classification = document.getElementById("categories");
classification.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  const category = event.target.innerText;
  if (category == "MEN") {
    addActiveClass(0);
    generateItemContainer(0);
  } else if (category == "WOMEN") {
    addActiveClass(1);
    generateItemContainer(1);
  } else if (category == "KIDS") {
    addActiveClass(2);
    generateItemContainer(2);
  }
});

function generateItemContainer(categoryNum) {
  console.log(itemData.categories);
  const items = itemData.categories[categoryNum].category_products;

  const itemContainer = document.getElementById("container");
  itemContainer.innerHTML = "";

  items.forEach((item) => {
    const currentPrice = item.price;
    const originalPrice = item.compare_at_price;
    const discount = (((originalPrice - currentPrice) / originalPrice) * 100).toFixed(2); ;
    if (item["badge_text"]) {
      itemContainer.innerHTML += `
        <div class="item">
            <div class="img_container" >
                <span class="badge">${item["badge_text"]}</span>
                <div class="item_img" style="background-image:url(${item.image})" alt="item_image"></div>
            </div>
            <div class = "title_container">
                <div class="title">${item.title} &#9679;</div>
                <div class="vendor">${item.vendor}</div>
            </div>
            <div class="price">
                <span class="current-price">Rs ${currentPrice}</span>
                <span class="original-price">Rs ${originalPrice}</span>
                <span class="discount">(${discount}% OFF)</span>
            </div>
            <button class="btn_add_bag" > Add to Bag </button>
        </div>
        `;
    } else {
      itemContainer.innerHTML += `
        <div class="item">
            <div class="img_container" >
                <div class="item_img" style="background-image:url(${item.image})" alt="item_image"></div>
            </div>
            <div class = "title_container">
                <div class="title">${item.title} &#9679;</div>
                <div class="vendor">${item.vendor}</div>
            </div>
            <div class="price">
                <span class="current-price">Rs ${item.price}</span>
                <span class="original-price">Rs ${item.compare_at_price}</span>
                <span class="discount">(50% OFF)</span>
            </div>
            <button class="btn_add_bag" > Add to Bag </button>
        </div>`;
    }
  });
}

function addActiveClass(categoryNum) {
  const classification = document.getElementsByClassName("category");
  for (let i = 0; i < classification.length; i++) {
    const current = document.getElementsByClassName("active");
    if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
    }
  }
  classification[categoryNum].className += " active";
}

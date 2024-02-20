document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector(".mode-switch");
modeSwitch.addEventListener("click", function () {
  document.documentElement.classList.toggle("light");
  modeSwitch.classList.toggle("active");
});

/*----------------my script----------------- */
document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("overlay").hidden = false;
  const productsContainer = document.getElementById("products-container");
  const loadingSpinner = document.getElementById("overlay");
  const url= "http://localhost:8080/api/products"
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
        method: "GET", // Method should be specified outside of the headers object
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
   const result= await response.json();
   console.log(result);
   loadingSpinner.hidden = true;
       // Populate product rows dynamically
      result.Data.forEach((product) => {
                                             const productRow = document.createElement("div");
                                             productRow.classList.add("products-row");

                                             // Product Image
                                             var imageCell = document.createElement("div");
                                             imageCell.classList.add("product-cell", "image");
                                             var productImage = document.createElement("img");
                                             productImage.src = product.photos;
                                             productImage.alt = product.title;
                                             productImage.style.width = "32px"; // Adjust the width as needed
                                             productImage.style.height = "32px"; // Maintain the aspect ratio
                                             imageCell.appendChild(productImage);

                                             // Product Name
                                             var nameCell = document.createElement("div");
                                             nameCell.classList.add("product-cell");
                                             nameCell.textContent = product.title;

                                             // Product Quantity
                                             var quantityCell = document.createElement("div");
                                             quantityCell.classList.add("product-cell");
                                             if (product.totalQuantity <= 4) {
                                               quantityCell.textContent = `Hurry, Only ${product.totalQuantity} Left!`;
                                             }

                                             // Product Price
                                             var priceCell = document.createElement("div");
                                             priceCell.classList.add("product-cell");
                                             priceCell.textContent = `$${product.price.toFixed(2)}`;

                                             // Append cells to the row
                                             productRow.appendChild(imageCell);
                                             productRow.appendChild(nameCell);
                                             productRow.appendChild(quantityCell);
                                             productRow.appendChild(priceCell);

                                             // Append the product row to the products container
                                             productsContainer.appendChild(productRow);
                                           });
    })



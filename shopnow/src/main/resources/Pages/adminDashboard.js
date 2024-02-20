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
                                             const newRow = document.createElement("tr");
                                             newRow.classList.add("product-row")
                                             // Product Image
                                            var prodImg = document.createElement("td");
                                            var productImage = document.createElement("img");

                                            productImage.src = product.photos;
                                            productImage.alt = product.title;
                                            productImage.style.width = "32px"; // Adjust the width as needed
                                            productImage.style.height = "32px";
                                            newRow.appendChild(productImage);


                                            // Product Name
                                             var nameCell = document.createElement("td");
                                             nameCell.textContent = product.title;
                                             newRow.appendChild(nameCell);

//                                             // Product Quantity
//                                             var quantityCell = document.createElement("td");
//                                             quantityCell.classList.add("product-cell");
//                                             if (product.totalQuantity <= 4) {
//                                               quantityCell.textContent = `Hurry, Only ${product.totalQuantity} Left!`;
//                                             }

                                             // Product Price
                                             var priceCell = document.createElement("td");
                                             priceCell.textContent = `$${product.price.toFixed(2)}`;
                                             newRow.appendChild(priceCell);



                                             // Append the product row to the products container
                                             productsContainer.appendChild(newRow);
                                           });
    })


function getRow(product){
return `<tr class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                        <td class="py-3 px-4 text-xs font-medium">1</td>
                        <td class="py-3 px-4 text-xs font-medium">
                            <div class="flex items-center">
                                <img src="https://scores.iplt20.com/ipl/teamlogos/GT.png" alt="Player Photo" class="w-12 h-12 rounded-full mr-2">
                                <span>Gujrat Titans</span>
                                <img src=${product.photos} alt="Player Photo" class="w-4 h-4 rounded-full ml-2">
                            </div>
                        </td>
                        <td class="py-3 px-4 text-xs">14</td>
                        <td class="py-3 px-4 text-xs">10</td>
                        <td class="py-3 px-4 text-xs">4</td>
                        <td class="py-3 px-4 text-xs">0</td>
                        <td class="py-3 px-4 text-xs">0.809</td>
                        <td class="py-3 px-4 text-xs">2450/268.1</td>
                        <td class="py-3 px-4 text-xs">2326/279.2</td>
                        <td class="py-3 px-4 text-xs">20</td>
                        <td class="py-3 px-4 text-xs">
                            <div class = "flex align-center">
                                <span class="rf W">W</span>
                                <span class="rf L">L</span>
                                <span class="rf W">W</span>
                                <span class="rf W">W</span>
                                <span class="rf L">L</span>
                            </div>
                        </td>
                    </tr>`
}
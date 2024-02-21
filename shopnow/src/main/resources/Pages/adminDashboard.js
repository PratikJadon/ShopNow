let categ = null;
let gender = null;
let sort = "asc";
let searchterm = null;
let baseUrl = "http://localhost:8080/api/products";
var withGender = ["clothes", "watches", "accessories"];

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

window.addEventListener("DOMContentLoaded", () => {
  render();
  document.documentElement.classList.toggle("light");
});

/*----------------my script----------------- */
function logout() {
  localStorage.clear();
  window.location.replace("login.html");
}

async function render() {
  var result = await fetchProduct();
  const productsContainer = document.getElementById("table-container");
  productsContainer.innerHTML = "";
  // Populate product rows dynamically
  result.Data.forEach((product) => {
    productsContainer.innerHTML += getTable(product);
  });
}

async function fetchProduct() {
  let params = [];

  // Add category to params if it's not null
  if (categ) {
    params.push(`category=${categ}`);
  }

  // Add gender to params if it's not null
  if (gender) {
    params.push(`gender=${gender}`);
  }

  // Add sortByPrice to params if it's not null
  if (sort) {
    params.push(`sortPrice=${sort}`);
  }
  if (searchterm) {
    params.push(`searchKey=${searchterm}`);
  }
  var newUrl = baseUrl;
  // Concatenate params array with '&' and append to baseUrl if params are present
  if (params.length > 0) {
    newUrl += "?" + params.join("&");
  }
  document.getElementById("overlay").hidden = false;
  const loadingSpinner = document.getElementById("overlay");
  const token = localStorage.getItem("token");
  const response = await fetch(newUrl, {
    method: "GET", // Method should be specified outside of the headers object
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.status == 401) {
    alert("You are not logged in.");
    window.location.replace("login.html");
    return;
  }
  loadingSpinner.hidden = true;
  return result;
}

document
  .getElementById("searchBox")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchterm = event.target.value;
      render();
    }
  });

async function increaseStock(e) {
  const token = localStorage.getItem("token");
  const productid = e.attributes.dataarg1.nodeValue;
  const response = await fetch(
    `http://localhost:8080/api/products/incstock?productId=${productid}`,
    {
      method: "GET", // Method should be specified outside of the headers object
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  document.getElementById("overlay").hidden = false;
  setTimeout(() => {
    document.getElementById("overlay").hidden = true;
    render();
  }, 500);
}
async function removeStock(e) {
  const token = localStorage.getItem("token");
  const productid = e.attributes.dataarg1.nodeValue;
  const response = await fetch(
    `http://localhost:8080/api/products/remstock?productId=${productid}`,
    {
      method: "GET", // Method should be specified outside of the headers object
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  document.getElementById("overlay").hidden = false;
  setTimeout(() => {
    document.getElementById("overlay").hidden = true;
    render();
  }, 500);
}

async function decreaseStock(e) {
  const token = localStorage.getItem("token");
  const productid = e.attributes.dataarg1.nodeValue;
  const response = await fetch(
    `http://localhost:8080/api/products/decstock?productId=${productid}`,
    {
      method: "GET", // Method should be specified outside of the headers object
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  document.getElementById("overlay").hidden = false;
  setTimeout(() => {
    document.getElementById("overlay").hidden = true;
    render();
  }, 500);
}

function getCateg() {
  var select = document.getElementById("category");
  if (select.value == "All Categories") {
    categ = null;
  } else {
    categ = select.value.toLowerCase();
  }

  if (withGender.includes(categ)) {
    document.getElementById("gender").disabled = false;
  } else {
    document.getElementById("gender").value = "None";
    document.getElementById("gender").disabled = true;
    gender = null;
  }
  render();
}

function getGender() {
  var select = document.getElementById("gender");
  if (select.value == "None") {
    gender = null;
  } else {
    gender = select.value.toLowerCase();
  }
  render();
}

async function addprodBTN(e) {
  e.preventDefault();
  var quantity = document.getElementById("totalquantity").value;
  var price = document.getElementById("price").value;
  var photos = document.getElementById("photos").value;
  var title = document.getElementById("title").value;
  var rating = document.getElementById("rating").value;
  var category = document.getElementById("add_category").value;
  var gender = document.getElementById("add_gender").value;

  var body = {
    title: title,
    photos: photos,
    rating: rating,
    price: Number(price),
    category: category == "None" ? null : category.toLowerCase(),
    gender: gender == "None" ? null : gender.toLowerCase(),
    totalQuantity: Number(quantity),
  };
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/api/products/addstock`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  document.getElementById("prodForm").reset();
}

function getTable(product) {
  return `<tr class="bg-white border-b dark:hover:bg-gray-100">
                            <td class="p-4">
                                <img src="${product.photos}" class="w-16 md:w-32 h-24 object-contain" alt="Image">
                            </td>
                            <td class="px-6 py-4 font-normal text-gray-900 dark:text-black">
                                ${product.title}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <button dataarg1=${product.id} onclick="decreaseStock(this)" class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full bg-white" type="button">
                                        <span class="sr-only">Quantity button</span>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <div>
                                        <input  id="first_product" class="bg-gray-100 text-center w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1  dark:border-gray-600 dark:text-black" placeholder="${product.totalQuantity}"  disabled/>
                                    </div>
                                    <button dataarg1=${product.id} onclick="increaseStock(this)" class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 " type="button">
                                        <span class="sr-only">Quantity button</span>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                                $${product.price}
                            </td>
                            <td class="px-6 py-4">
                                <a onclick="removeStock(this)" dataarg1="${product.id}" class="p-2 rounded-lg cursor-pointer font-medium text-red-600 dark:text-red-500 hover:bg-white ">Remove</a>
                            </td>
    </tr>`;
}

async function cart_addtocart(event) {
  var productid = event.attributes.dataagr1.nodeValue;
  var token = event.attributes.dataagr2.nodeValue;
  const reponse = await fetch(
    `http://localhost:8080/api/products/addcart?productId=${productid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await reponse.json();
  populatecart();
}

async function addtocart(event) {
  var spinner = event.children[0].children[1];
  spinner.hidden = false;
  var productid = event.attributes.dataagr1.nodeValue;
  var token = event.attributes.dataagr2.nodeValue;
  const reponse = await fetch(
    `http://localhost:8080/api/products/addcart?productId=${productid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (reponse.status == 401) {
    alert("You are not logged in.");
    window.location.replace("login.html");
    return;
  }
  spinner.hidden = true;
  addtoast();
  const data = await reponse.json();
}

function addtoast() {
  var container = document.getElementById("toastcontainer");
  var nd = document.createElement("div");
  nd.setAttribute(
    "class",
    "transition duration-300 transform translate-y-full ease-in"
  );
  container.insertBefore(nd, container.firstChild);
  // container.appendChild(nd);
  nd.innerHTML += `<div
      id="toast-success"
      class="flex z-999 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Item added to cart.</div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>`;
  setTimeout(() => {
    nd.classList.remove("translate-y-full");
    nd.classList.remove("ease-in");
    nd.classList.add("translate-y-0");
    nd.classList.add("ease-out");
  }, 50);

  setTimeout(() => {
    nd.classList.add("translate-x-full");
    nd.classList.add("ease-out-1");
  }, 3000);

  setTimeout(() => {
    container.removeChild(nd);
  }, 5000);
}

async function deletefromcart(event) {
  var productid = event.attributes.dataagr1.nodeValue;
  var token = event.attributes.dataagr2.nodeValue;
  const reponse = await fetch(
    `http://localhost:8080/api/products/deletecart?productId=${productid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await reponse.json();
  populatecart();
}

async function getCart(token) {
  const response = await fetch(`http://localhost:8080/api/products/getcart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 401) {
    alert("You are not logged in.");
    window.location.replace("login.html");
    return;
  }
  const data = await response.json();
  return data;
}

async function populatecart() {
  var token = localStorage.getItem("token");
  var cartContainer = document.getElementById("cart-container");
  var spinner = document.createElement("div");
  spinner.innerHTML += `<div id="infiniteSpinner" role="status" class="h-96 flex justify-center items-center">
  <svg
    aria-hidden="true"
    class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
  <span class="sr-only">Loading...</span>
</div>`;
  cartContainer.innerHTML = "";
  cartContainer.append(spinner);
  var cartData = await getCart(token);
  var newHtml = "";
  var totalamount = 0;

  for (let i = 0; i < cartData.Products.length; i++) {
    var prod = cartData.Products[i];
    var quant = cartData.Quantity[i];
    newHtml += cartItems(
      prod.photos,
      prod.title,
      quant,
      prod.price,
      prod.id,
      token
    );
    totalamount += quant * prod.price;
  }
  cartContainer.innerHTML = newHtml;
  cartContainer.innerHTML += `  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div class="flex justify-between text-base font-medium text-gray-900">
    <p>Subtotal</p>
    <p>$${totalamount}</p>
  </div>
  <p class="mt-0.5 text-sm text-gray-500">
    50% GST will be applicable.
  </p>
  <div class="mt-6">
    <a

      onclick="openmodal()"
      style="background-color: #944E63;"
      class="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >Checkout</a
    >
  </div>
  <div
    class="mt-6 flex justify-center text-center text-sm text-gray-500"
  >
    <p>
      or
      <button
        type="button"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        onclick="togglecart()"
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
    </p>
  </div>
</div>
</div>`;
}

async function clearcart() {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/api/products/clearcart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 401) {
    alert("You are not logged in.");
    window.location.replace("login.html");
    return;
  }
  const data = await response.json();
  return data;
}

function closemodal() {
  document.getElementById("static-modal").hidden = true;
}

async function openmodal() {
  const token = localStorage.getItem("token");
  const data = await getCart(token);
  if (data.Products.length == 0) return;
  togglecart();
  document.getElementById("overlay").hidden = false;
  setTimeout(() => {
    document.getElementById("static-modal").hidden = false;
    clearcart();
    document.getElementById("overlay").hidden = true;
  }, 500);
}

function cartItems(imageurl, title, quantity, price, prodid, token) {
  return `<div class="flex justify-between mt-6">
    <div class="flex">
      <img
        class="h-20 w-12 object-contain rounded"
        src=${imageurl}
        alt=""
      />
      <div class="mx-3">
        <h3 class="text-sm text-gray-600">${title}</h3>
        <div class="flex items-center mt-2">
          <button
            class="text-gray-500 focus:outline-none focus:text-gray-600"
            onclick=cart_addtocart(this,true)
            dataagr1=${prodid}
            dataagr2=${token}
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          <span class="text-gray-700 mx-2">${quantity}</span>
          <button
            class="text-gray-500 focus:outline-none focus:text-gray-600"
            onclick=deletefromcart(this)
            dataagr1=${prodid}
            dataagr2=${token}
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <button
            onclick="removeItem(this)"
            dataagr1=${prodid}
            dataagr2=${token}
            style="background-color:#B47B84;"
            class="text-white p-1 m-auto rounded-md hover:bg-indigo-700 rounded"
            id="removeItem"
          >Remove
          </button>
        </div>
      </div>
    </div>
    <span class="text-gray-600">$${price}</span>
  </div>`;
}

async function removeItem(event) {
  var productid = event.attributes.dataagr1.nodeValue;
  var token = event.attributes.dataagr2.nodeValue;
  const reponse = await fetch(
    `http://localhost:8080/api/products/removeitem?productId=${productid}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await reponse.json();
  populatecart();
}

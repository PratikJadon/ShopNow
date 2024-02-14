async function addtocart(event, populate) {
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
  if (populate) populatecart();
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
  const data = await response.json();
  return data;
}

async function populatecart() {
  var token = localStorage.getItem("token");
  var cartContainer = document.getElementById("cart-container");
  var cartData = await getCart(token);
  var newHtml = "";
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
  }
  cartContainer.innerHTML = newHtml;
}

function cartItems(imageurl, title, quantity, price, prodid, token) {
  return `<div class="flex justify-between mt-6">
    <div class="flex">
      <img
        class="h-20 w-20 object-cover rounded"
        src=${imageurl}
        alt=""
      />
      <div class="mx-3">
        <h3 class="text-sm text-gray-600">${title}</h3>
        <div class="flex items-center mt-2">
          <button
            class="text-gray-500 focus:outline-none focus:text-gray-600"
            onclick=addtocart(this,true)
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
          </button>
        </div>
      </div>
    </div>
    <span class="text-gray-600">$${price}</span>
  </div>`;
}

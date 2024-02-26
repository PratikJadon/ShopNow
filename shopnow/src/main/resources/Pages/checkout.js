window.addEventListener("DOMContentLoaded", populateOrder);

async function fetchCart() {
  const token = localStorage.getItem("token");
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

async function populateOrder() {
  const data = await fetchCart();
  console.log(data.Products[0].photos);
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < data.Products.length; i++) {
    let products = data.Products[i];
    let quantity = data.Quantity[i];
    container.innerHTML += getOrder(products, quantity);
  }
}

function getOrder(prod, quant) {
  return ` <div class="details shadow">
  <div class="details__item">
    <div class="item__image">
      <img
        class="iphone"
        src="${prod.photos}"
        alt=""
      />
    </div>
    <div class="item__details">
      <div class="item__title">${prod.title}</div>
      <div class="item__price">$${prod.price}</div>
      <div class="item__quantity">Quantity: ${quant}</div>
    </div>
  </div>
  </div>`;
}

function checkCardNumber() {
  var cardno = document.getElementById("cardno").value;
  var cardnoSpan = document.getElementById("cardno_span");
  cardnoSpan.innerHTML = "";

  if (!/^\d{16}$/.test(cardno)) {
    cardnoSpan.innerHTML = "Card No should only contain 16 numeric digits.";
    return;
  }
}

function checkCvvNumber() {
  var cvv = document.getElementById("cvvno").value;
  var cvvSpan = document.getElementById("cvv_span");
  cvvSpan.innerHTML = "";
  if (!/^\d{3}$/.test(cvv)) {
    cvvSpan.innerHTML = "Card No should only contain 3 numeric digits.";
    return;
  }
}

function checkHolder() {
  var holder = document.getElementById("cardholder").value;
  var span = document.getElementById("cardholder-span");
  span.innerHTML = "";
  if (!/^[a-zA-Z\s]+$/.test(holder)) {
    span.innerHTML = "Name can only contain alphabets.";
  }
}

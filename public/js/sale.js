const invoicedate = document.getElementById("invoicedate");

const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const dt = date + "/" + (month + 1) + "/" + year;
invoicedate.value = dt;

// select tag value
const customer = document.getElementById("customer");

customer.addEventListener("change", function getvalue() {
  document.getElementById("customer_name").value =
    customer.value.split("--")[0];
  document.getElementById("add").value = customer.value.split("--")[1];
  document.getElementById("mob").value = customer.value.split("--")[2];
  document.getElementById("gst").value = customer.value.split("--")[3];
});


const sale_height = document.getElementById("sale_height");
const sale_width = document.getElementById("sale_width");
const sale_area = document.getElementById("sale_area");
const sale_qty = document.getElementById("sale_qty");
const sale_rate = document.getElementById("sale_rate");
const sale_value = document.getElementById("sale_value");
const sale_total = document.getElementById("sale_total");

const sale_discount = document.getElementById("sale_discount");
const sale_cgst = document.getElementById("sale_cgst");
const sale_sgst = document.getElementById("sale_sgst");
const sale_igst = document.getElementById("sale_igst");
const select_cgst = document.getElementById("select_cgst");
const select_sgst = document.getElementById("select_sgst");
const select_igst = document.getElementById("select_igst");
const sale_gsum = document.getElementById("sale_gsum");

// to calcaulate amount- sale value
function getvalue() {
  if (sale_area.value == 0) {
    sale_value.value = sale_qty.value * sale_rate.value;
  } else {
    sale_value.value = sale_area.value * sale_qty.value * sale_rate.value;
  }
}

function getarea() {
  sale_area.value = sale_height.value * sale_width.value;
}

function getcgst() {
  sale_cgst.value =
    ((Number(sale_total.value) - sale_discount.value) * select_cgst.value) /
    100;
  gsum();
}


function getsgst() {
  sale_sgst.value =
    ((Number(sale_total.value) - sale_discount.value) * select_sgst.value) /
    100;
  gsum();
}
function getigst() {
  sale_igst.value =
    ((Number(sale_total.value) - sale_discount.value) * select_igst.value) /
    100;
  gsum();
}

function gsum() {
  sale_gsum.value =
    Number(sale_total.value) -
    sale_discount.value +
    Number(sale_cgst.value) +
    Number(sale_sgst.value) +
    Number(sale_igst.value);
}


// event listners 
select_cgst.addEventListener("change", getcgst);
select_sgst.addEventListener("change", getsgst);
select_igst.addEventListener("change", getigst);

sale_rate.addEventListener("input", getvalue);
sale_qty.addEventListener("input", getvalue);
sale_width.addEventListener("input", getarea);
sale_width.addEventListener("input", getvalue);
sale_height.addEventListener("input", getarea);
sale_height.addEventListener("input", getvalue);
sale_discount.addEventListener("input", recalculatesum);

// to find total sum of amount , by iterating amount columns of table
function sum() {
  const sale_amountArray = document.getElementsByClassName("sale_amount");
  let sale_totalAmount = 0;
  for (const element of sale_amountArray) {
    sale_totalAmount += Number(element.value);
  }
  sale_total.value = sale_totalAmount;
}


// when remove a row from table
function remove(e) {
  e.parentNode.parentNode.remove();
  sum();
  getcgst();
  getsgst();
  getigst();
  gsum();
}

// If there is a discount
function recalculatesum() {
  getcgst();
  getsgst();
  getigst();
  gsum();
}


function recalculate() {}

// create a row inside table and invoked amount sum functions
const create_item = document.getElementById("create_item");

create_item.addEventListener("click", function createitem() {

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  const td7 = document.createElement("td");
  const td8 = document.createElement("td");
  const td9 = document.createElement("td");
  const tr = document.createElement("tr");

  const input2 = document.createElement("input");
  const input3 = document.createElement("input");
  const input4 = document.createElement("input");
  const input5 = document.createElement("input");
  const input6 = document.createElement("input");
  const input7 = document.createElement("input");
  const input8 = document.createElement("input");

  input8.className = "sale_amount";

  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.className = "btn-danger";
  btn.setAttribute("onclick", "remove(this)");

  // input2.innerHTML=document.getElementById("product").firstElementChild.value
  input2.setAttribute("value", document.getElementById("product").value);
  input2.setAttribute("name", "product_name");
  input3.setAttribute("value", sale_height.value);
  input3.setAttribute("name", "product_height");
  input4.setAttribute("value", sale_width.value);
  input4.setAttribute("name", "product_width");
  input5.setAttribute("value", sale_area.value);
  input5.setAttribute("name", "product_area");
  input6.setAttribute("value", sale_qty.value);
  input6.setAttribute("name", "product_qty");
  input7.setAttribute("value", sale_rate.value);
  input7.setAttribute("name", "product_rate");
  input8.setAttribute("value", sale_value.value);
  input8.setAttribute("name", "product_value");

  td2.appendChild(input2);
  td3.appendChild(input3);
  td4.appendChild(input4);
  td5.appendChild(input5);
  td6.appendChild(input6);
  td7.appendChild(input7);
  td8.appendChild(input8);
  td9.appendChild(btn);

  tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
  document.getElementById("sale_table").appendChild(tr);

  sum();
  getcgst();
  getsgst();
  getigst();
  gsum();

  sale_height.value = 0;
  sale_width.value = 0;
  sale_area.value = 0;
  sale_qty.value = 0;
  sale_rate.value = 0;
  sale_value.value = 0;
});

function printpage() {
  window.print();
}
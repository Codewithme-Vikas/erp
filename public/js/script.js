

const product_rate = document.getElementById("product_rate");

product_rate?.addEventListener("input", function getvalue(){
    const product_qty = document.getElementById("product_qty");
    const product_value = document.getElementById("product_value");
    product_value.value = product_qty.value*this.value  
});


console.log(document.getElementById("product") , "this console written inside public/js/script file")




var main = document.getElementById("main");
if(main){

for(i=0; i<dogcountry.length; i++){
	
    var li = document.createElement("li");
    var h2 = document.createElement("h2");
    var img = document.createElement("img");
    var span = document.createElement("span");
    
    var h2text = document.createTextNode(dogcountry[i].BrandName);
    var spantext = document.createTextNode("$"+dogcountry[i].Price);
    
    h2.appendChild(h2text);
    span.appendChild(spantext);
    
    img.setAttribute("src", "images/"+dogcountry[i].Photo);
    
    img.onclick = function(){
        var largeImg = document.createElement("img");
        largeImg.setAttribute("src", this.getAttribute("src"));
        
        document.getElementById("innerview").appendChild(largeImg);
        document.getElementById("view").setAttribute("class","show");
    }
    
    li.appendChild(h2);
    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(createForm(i));
    
    main.appendChild(li);
} // close loop

document.getElementById("view").onclick = function(){
    this.setAttribute("class","hide");
    
    var inner = document.getElementById("innerview");
    
    inner.removeChild(inner.firstElementChild);
}

// change view

var grid = document.getElementById("grid");
var list = document.getElementById("list");

grid.onclick = function(){
    main.setAttribute("class","grid");
}

list.onclick = function(){
    //console.log("You clicked");
    
    main.removeAttribute("class","list");
}

} // close if(main)

function createForm(num){
    // dropdown menu:
    // form tag
    var form = document.createElement("form");
    form.setAttribute("data-number", num);
    // qty select
    var select = document.createElement("select");
    // options
    for(var i=1; i<=10; i++){
        var opt = document.createElement("option");
        opt.setAttribute("value", i);
        
        var optText = document.createTextNode(i);
        
        opt.appendChild(optText);
        select.appendChild(opt);
    }
    // call var form = document.createElement("form");
    form.appendChild(select);
    //button
    var button = document.createElement("input");
    button.setAttribute("type","submit"); // type of box that will appear
    button.setAttribute("value","add to cart"); // what the box will say
    
    form.appendChild(button)
    //set the interaction of the form
    form.onsubmit = saveInformation;
    
    return form; // return a value to what called the function
}

function saveInformation(){
    var dogcountryNumber = this.getAttribute("data-number");
    
    // where is the qty?
    var select = this.getElementsByTagName("select");
    
    var qty = select[0].value;
    
    localStorage.setItem(dogcountryNumber, qty);
    
    return false; // ignore the default settings of the submit function
}

/* Display Cart Items */

var cart = document.getElementById("cart");

if(cart){
    
    displayCart();
    
    
} // end if(cart)

function createTag(tagName,tagText){
	var tag = document.createElement(tagName);
	var txt = document.createTextNode(tagText);
	
	tag.appendChild(txt);
	
	return tag; // send the created tag to where the function was called
}


function displayCart(){
	
	while(cart.firstChild){
		cart.removeChild(cart.firstChild);
	}
	
	var items = localStorage;
	var total = 0;
	
	for(var key in items){
        // console.log(dogcountry[key].title); // check book number
        
        // console.log(items[key]); // check quantity
        
        var price = dogcountry[key].Price * items[key]; // get the price * the qty set for the  products
        // console.log(price);
		
		total += price;
		console.log(total);
		
		var row = document.createElement("div");  // create individual rows
		row.setAttribute("class","row");
		
		// create title under function(below)
		
		var BrandName = createTag("strong",dogcountry[key].BrandName);
		var qty = createTag("span",items[key]); // what is stored in local storage
		var priceTag = createTag("span","$"+price.toFixed(2));
		
		var remove = createTag("em","delete");
		remove.setAttribute("data-key",key); // "data- blank " = create own attribute
		// set attr to the key of the items array
		
		remove.onclick = function(){
			//console.log("delete");
			var dataKey = this.getAttribute("data-key");
			localStorage.removeItem(dataKey);
			
			displayCart();
		}
		
		row.appendChild(BrandName);
		row.appendChild(qty);
		row.appendChild(priceTag);
		row.appendChild(remove);
		
		cart.appendChild(row);
		
	} // end the loop
	
	var totalRecall = createTag("h3","$"+total.toFixed(2));
	
	cart.appendChild(totalRecall);
}

// cart notification

var cartIcon = document.getElementById("cartIcon");

if(cartIcon){
	var items = localStorage;
	var count = items.length;
	
	var number = createTag("span",count);
	
	cartIcon.appendChild(number);
}

function dispalyCartIcon(){
	
}

// HTML
<!DOCTYPE html>
<html lang=en>
	<head>
		<meta charset="utf-8">
		<title>Dog Country</title>
		<link rel="stylesheet" href="js/style.css">
	</head>
	
<body>
    
    <h1>Dog Country</h1>
    
    <div id="cartIcon">
        <a href="order.html"></a>
    </div>
	
	<div id="wrapper">
		
        <span id="grid">Grid</span>
		<span id="list">List</span>
		
		<ul id="main" class="grid"></ul>
        <ul id="main2" class="list"></ul>
		
	</div>
	
    <div id="view" class="hide">
        <div id="innerview"></div>
        <!--image-->
    </div>
    
	<script src="js/main.js"></script>
	
</body>
// HTML END

// CSS
#wrapper {
    max-width: 900px;
    margin: auto;
    background-color: #d7e5bd;
    top: 0;
}

h1 {
    position: relative;
    display: block;
    text-align: center;
    font-family: chalkduster;
    font-size: 80px;
}

body {
    background-color: #d7e5bd;
}

#list {
    display: block;
    font-family: copperplate;
    font-size: 25px;
    padding: 10px;
    text-align: center;
}

#grid {
    display: block;
    font-family: arial;
    font-size: 25px;
    padding: 10px;
    text-align: center;
}

#main li {
	list-style-type: none;
	text-align: center;
	background-color: rgba(0,0,0,.25);
    font-family: copperplate;
}

#main {
	display: block;
}

#main li img {
	width: 90%;
    max-width: 300px
}

#main li span {
    font-family: copperplate;
    display: block;
    font-size: 30px;
}

ul.grid li {
    width: 25%;
    float: left;
	list-style-type: none;
    font-family: copperplate;
    text-align: center;
    display: block;
    height: 500px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
	margin: 10px;
}
/*
ul li img src {
    max-width: 300px;
    height: auto;
    display: block;
	padding: 10px;
}
*/
#view {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0,0,0,.8);
    width: 100%;
    height: 100%;
}

#view img {
    margin: auto;
    height: 100vh;
    width: 25%;
    display: block;
}

.hide {
    display: none;
}

.show {
    display: block;
}

#cart {
    height: 500px;
    background-color: rgba(0,0,0,.25);
    padding-top: 50px;
}

#cartIcon {
    position: relative;
    display: block;
    float: right;
    padding: 5px;
}

#cartIcon a {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
}

#cartIcon Span {
    display: inline-block;
    text-align: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: darkred;
    color: white;
    font-family: copperplate;
    font-size: 38px;
}

h3 {
    text-align: center;
    font-size: 50px;
    font-family: copperplate;
    padding-top: 10%;
}

.row {
    background-color: rgba(0,0,0,.25);
    text-align: center;
}

.row strong {
    color:white;
    display: block;
    font-size: 50px;
    font-family: copperplate;
}

.row span {
    color: aliceblue;
    font-family: copperplate;
    font-size: 23px;
}


// CSS END























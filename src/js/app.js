//"use strict"
const log = console.log;

//available list item
const items = [
	{name: 'cake with fraise', img: 'src/img/cake1.jpg', price: 15.99 },
	{name: 'cake imperial', img: 'src/img/cake2.jpg', price: 35.99 },
	{name: 'cake bullets', img: 'src/img/cake3.jpg', price: 10.33 },
	{name: 'pleasant warrior', img: 'src/img/cake4.jpg', price: 45.70 },
	{name: 'sweet like pussy', img: 'src/img/cake5.jpg', price: 5.87 },
	{name: 'strong dick', img: 'src/img/cake6.jpg', price: 157.55 },
	{name: 'schweeps 4', img: 'src/img/cake7.jpg', price: 23.63 },
	{name: 'super mega cake', img: 'src/img/cake8.jpg', price: 77.99 },
	{name: 'necessary cake', img: 'src/img/cake9.jpg', price:85.99 }
];

//BUTTONS
const btnsRemoveFromCart = document.getElementsByClassName('cart-item-delete');
const btnClearCart = document.getElementsByClassName('btn-clear-cart')[0];
const btnCartBox = document.getElementsByClassName('btn-cart-box')[0];
const btnAddToCart = document.getElementsByClassName('btn-add-to-cart');

//HTML ELEMENTS
const totalCart = document.getElementsByClassName('total')[0];
const cartItems = document.getElementsByClassName('cart-item');
const nberItemsInCart = document.getElementsByClassName('nber-item')[0];
const totalInBtnCartBox = document.getElementsByClassName('total-cart')[0];
const cartBox = document.getElementsByClassName('cart-box')[0];
const cartItemsBox = document.getElementsByClassName('cart-items')[0];
const shopItemsBox = document.getElementsByClassName('shop-items-box')[0];
const template1 = document.querySelector('.template1');
const template2 = document.querySelector('.template2');

updateTotal();

document.addEventListener('DOMContentLoaded', ready);

function ready() {
	init();
	
	cartItemsBox.addEventListener('click', function(e) {
		if(e.target.classList.contains('cart-item-delete')) {
			removeItemInCart(e)
		}
	})

	btnClearCart.addEventListener('click', clearCart);

	btnCartBox.addEventListener('click', function() {
		if(cartBox.classList.contains('hide')) {
			cartBox.classList.remove('hide');
		} else {
			cartBox.classList.add('hide');
		}
	});

	Array.prototype.slice.call(btnAddToCart).forEach(btnAdd => {
		btnAdd.addEventListener('click', putInCart)
	});
}

// FUNCTION
function init() {
	shopItemsBox.innerHTML = '';
	items.forEach(currentItem => {
		var html = template2.textContent;
		html = html.replace('%name%', currentItem.name);
		html = html.replace('%price%', currentItem.price);
		html = html.replace('%img%', currentItem.img);
		
		shopItemsBox.innerHTML += html;
	})
}


function removeItemInCart (event) {
	const target = event.target.parentElement;
	target.remove();
	updateTotal();
}

function clearCart() {
	if(confirm('Are you sure you want to clear the cart?')) {
		cartItemsBox.innerHTML = '';
		updateTotal();
	}
	
}

function putInCart (e) {
	const item = e.target.parentElement.parentElement;
	const name = item.querySelector('.shop-item-name').firstElementChild.textContent;
	const price = item.getElementsByClassName('actual-price')[0].textContent;
	const srcImage = item.getElementsByClassName('shop-item-img')[0].firstElementChild.src;
	
	let html = template1.textContent;
	html = html.replace('%name%', name);
	html = html.replace('%price%', '$'+ price);
	html = html.replace('%img%', srcImage);
	
	cartItemsBox.innerHTML += html;
	updateTotal();
}

function updateTotal () {
	var total = 0;
	var nb = 0;
	if(!cartItems) {
		return;
	}
	Array.prototype.slice.call(cartItems).forEach(item => {
		nb++;
		const priceItem = item.getElementsByClassName('cart-item-price')[0];
		total += parseFloat(priceItem.textContent.slice(1));
		
	});
	total = (total).toFixed(2);
	totalCart.textContent = '$' + total;
	totalInBtnCartBox.textContent = total;
	nberItemsInCart.textContent = nb;
}



































































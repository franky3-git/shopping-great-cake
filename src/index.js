//"use strict"
const log = console.log;
const items = require('./js/data');


//set initial cart
let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


document.addEventListener('DOMContentLoaded', ready);

function ready() {
	//SELECT BUTTONS
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
	const shopItemsBox = document.getElementsByClassName('shop-items-box')[0]; //
	const template1 = document.querySelector('.template1'); //
	const template2 = document.querySelector('.template2'); //

	init();
	updateTotal();
	
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

	//add event on each button in the item
	Array.prototype.slice.call(btnAddToCart).forEach(btnAdd => {
		btnAdd.addEventListener('click', putInCart)
	});


	//FUNCTIONS
	function init() {
		shopItemsBox.innerHTML = '';
		items.forEach(currentItem => {
			var html = template2.textContent;
			html = html.replace('%name%', currentItem.name);
			html = html.replace('%price%', currentItem.price);
			html = html.replace('%img%', currentItem.img);
			
			shopItemsBox.innerHTML += html;
		});
		renderSelectedItems();
	}

	function renderSelectedItems () {
		cartItemsBox.innerHTML = '';
		cart.forEach(item => {
			
			let html = template1.textContent;
			html = html.replace('%name%', item.name);
			html = html.replace('%price%', '$'+ item.price);
			html = html.replace('%img%', item.src);
	
			cartItemsBox.innerHTML += html;
		});
		updateTotal();
	}

	function updateTotal () {
		var total = 0;
		var nb = 0;
		/*if(!cart) {
			return;
		}*/
		cart.forEach(item => {
			nb++;
			const priceItem = item.price;
			total += parseFloat(priceItem);
			
		});
		total = (total).toFixed(2);

		displayTotal(total, nb)
	}

	function displayTotal(total, nb) {
		totalCart.textContent = '$ '+ total;
		nberItemsInCart.textContent = nb;
		totalInBtnCartBox.textContent = total;
	}

	function putInCart (e) {
		const item = e.target.parentElement.parentElement;
		const name = item.querySelector('.shop-item-name').firstElementChild.textContent;
		const price = item.getElementsByClassName('actual-price')[0].textContent;
		const srcImage = item.getElementsByClassName('shop-item-img')[0].firstElementChild.src;
		
		const newItem = {name, price, src: srcImage};
		cart.push(newItem);
		renderSelectedItems();
		saveCart();
	}

	function clearCart() {
		if(confirm('Are you sure you want to clear the cart?')) {
			cart = [];
			renderSelectedItems();
			saveCart();
		}	
	}

	function removeItemInCart (event) {
		const target = event.target.parentElement;
		const nameItemRemove = target.querySelector('.cart-item-name').textContent;
		const indexToRemove = cart.findIndex(item => nameItemRemove == item.name);
		cart.splice(indexToRemove, 1);
		renderSelectedItems();
		saveCart();
	}
	
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

//localStorage.clear();

































































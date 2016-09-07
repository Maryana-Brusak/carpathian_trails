

function initBooking() {
	var orderButton = document.getElementsByClassName('order_button');
	for (i=0; i < orderButton.length; i++) {
		orderButton[i].addEventListener('click', order, false);
	}
}



function order(event){
	localStorage.setItem('trailName', event.target.getAttribute('data-trail-name'));
};
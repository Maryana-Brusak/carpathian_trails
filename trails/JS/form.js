


var orderButton = document.getElementsByClassName('order_button');
	for (i=0; i < orderButton.length; i++) {
		orderButton[i].addEventListener('click', order, false);
	}



function order(event){
	var trailName = event.target.parentElement.parentElement.getElementsByClassName('trail_name')[0];
	localStorage.setItem('trailName', trailName.textContent);
	
};
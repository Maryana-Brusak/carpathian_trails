	function rating(ratingEl) {
		
		ratingEl.addEventListener("click", doRating, false);
		getRating();

		function getRating() {
			var trailId = ratingEl.getAttribute('data-trail');
				
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200){
					var initialRating = parseInt(xhttp.responseText);
					drawStars(initialRating);			
				}
			}
			
			xhttp.open("GET", "/rating/" + trailId, true);
			xhttp.send();
		};

		function drawStars (ratedStars) {
			var stars = 1;

			while (ratingEl.lastChild) {
			    ratingEl.removeChild(ratingEl.lastChild);
			}

			for (var i = 0; i < ratedStars; i++) {
				var rate = document.createElement('div');
				rate.className = ('rated');	
				rate.setAttribute('data-rating', stars++);	
				ratingEl.appendChild(rate);
			}
		
			for (var i = 0; i <  5 - ratedStars; i++) {
				var unrate = document.createElement('div');
				unrate.className = ('unrated');	
				unrate.setAttribute('data-rating', stars++);
				ratingEl.appendChild(unrate);
			}
		}

		function doRating(e) {
			var rating = e.target.getAttribute("data-rating");
			var trailId = ratingEl.getAttribute('data-trail');
				
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200){
					var newRating = parseInt(xhttp.responseText);
					if (newRating !== 'NaN' && newRating > 0 && newRating <= 5) {
						drawStars(newRating);	
					} 					
				}
			}
			
			xhttp.open("POST", "/rating/" + trailId, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("rating=" + rating);
		};


	};

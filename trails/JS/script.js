function loadFilters () {


	var trailsToFilter = document.querySelectorAll('#itemsToFilter li');
	var checkBoxes = document.querySelectorAll("#filterSection li input");
	  
	for (var i = 0; i < checkBoxes.length; i++) {
	    checkBoxes[i].addEventListener("click", filterTrails, false);
	}

	for (var i = 0; i < trailsToFilter.length; i++) {
		trailsToFilter[i].filtering = [];
	}

	/**
	 * Filter checkbox onclick handler
	 */
	function filterTrails(e) {
	    var clickedFilter = e.target;
		var filterType = clickedFilter.getAttribute("data-filtering");
		var filterBy = clickedFilter.value;

	    for (var i = 0; i < trailsToFilter.length; i++) {
	        var currentTrail = trailsToFilter[i];
			

			if (currentTrail.getAttribute("data-" + filterType) == filterBy) {
				if (clickedFilter.checked == true) {
					//show hidden trail
					var index = currentTrail.filtering.indexOf(filterBy);
					currentTrail.filtering.splice(index, 1);
					//check if there is some filters left
					if (currentTrail.filtering.length == 0) {
						currentTrail.classList.remove("hideItem");
						currentTrail.classList.add("showItem");
					}
				} else {
					// hide trail
					currentTrail.filtering.push(filterBy);
					currentTrail.classList.remove("showItem");
					currentTrail.classList.add("hideItem");

				}	
	        }
		}
	}

}
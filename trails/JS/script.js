var trailsToFilter = document.querySelectorAll('#itemsToFilter li');
var checkBoxes = document.querySelectorAll("#filterSection li input");
  
for (var i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("click", filterTrails, false);
    checkBoxes[i].checked = true;
}

for (var i = 0; i < trailsToFilter.length; i++) {
	trailsToFilter[i].filtering = [];
}
  
function filterTrails(e) {
    var clickedTrail = e.target;
	var dataFiltering = clickedTrail.getAttribute("data-filtering");

      
    if (clickedTrail.checked == true) {
       showTrails(clickedTrail.value, "hideItem", "showItem", dataFiltering);
    } else if (clickedTrail.checked == false) {
        hideTrails(clickedTrail.value, "showItem", "hideItem", dataFiltering);
    } 
}

function hideTrails(itemType, classToRemove, classToAdd, dataFiltering) {
	for (var i = 0; i < trailsToFilter.length; i++) {
        var currentTrail = trailsToFilter[i];

		if (currentTrail.getAttribute("data-" + dataFiltering) == itemType) {
			currentTrail.filtering.push(itemType);

            removeClass(currentTrail, classToRemove);
            addClass(currentTrail, classToAdd);
        } 
    }
}



function showTrails(itemType, classToRemove, classToAdd, dataFiltering) {
	for (var i = 0; i < trailsToFilter.length; i++) {
        var currentTrail = trailsToFilter[i];

		if (currentTrail.getAttribute("data-" + dataFiltering) == itemType) {
			var index = currentTrail.filtering.indexOf(itemType);
			currentTrail.filtering.splice(index, 1);

			if (currentTrail.filtering.length == 0) {
				removeClass(currentTrail, classToRemove);
                addClass(currentTrail, classToAdd);

			}            
        } 
    }
}


 
 function addClass(element, classToAdd) {
    var currentClassValue = element.className;
        
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            element.className = classToAdd;
        } else {
            element.className += " " + classToAdd;
        }
    }
}
        
function removeClass(element, classToRemove) {
    var currentClassValue = element.className;
  
    if (currentClassValue == classToRemove) {
        element.className = "";
        return;
    }
  
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
  
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
  
    element.className = filteredList.join(" ");
}

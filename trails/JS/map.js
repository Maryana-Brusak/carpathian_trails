

	function initMap(data){
		return function() {
			preventGoogleFontLoading();

			for (var i = 0; i < data.length; i++) {

				var dataItem = data[i];
				var latlng = new google.maps.LatLng(dataItem.Lat, dataItem.Lng);
				var mapOptions = {
			        zoom: 10,
			        center: latlng,
			        mapTypeId: google.maps.MapTypeId.TERRAIN
		    	};	

		    	var map = new google.maps.Map(document.getElementById(dataItem.id), mapOptions);

		    	var myMarker = new google.maps.Marker(
			    {
			        position: latlng,
			        map: map,
			        title: dataItem.title
			   });

			   var infowindow = new google.maps.InfoWindow({
					content: dataItem.title
				});	

				infowindow.open(map,myMarker);
			}
		}

	}

	function initGoogleMaps(data) {
		google.maps.event.addDomListener(window, 'load', initMap(data));
	}





	function preventGoogleFontLoading() {
		var head = document.getElementsByTagName('head')[0];

		// Save the original method
		var insertBefore = head.insertBefore;

		// Replace it!
		head.insertBefore = function (newElement, referenceElement) {

		    if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {

		        console.info('Prevented Roboto from loading!');
		        return;
		    }

		    insertBefore.call(head, newElement, referenceElement);
		};
	}


	function HideShow(event) {
		var magicButton = event.target;
		var mapId = magicButton.getAttribute('data-map-id');
		var myMap = document.getElementById(mapId);

		if(myMap.style.display == 'none') {
			myMap.style.display = 'block';
			magicButton.textContent = "Сховати карту району";

		} else {
		
			myMap.style.display = 'none';
			magicButton.textContent = "Показати карту району";
		}
		
	};
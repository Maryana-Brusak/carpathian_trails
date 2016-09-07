		function sendRequest(url, cfunc) {
  			  			
	  			var formData = new FormData(document.querySelector("form"));
				formData.set('page', document.location.hash.substring(1));

			  	var xhttp;
			 	 xhttp = new XMLHttpRequest();
			 	 xhttp.onreadystatechange = function() {
			    	if (xhttp.readyState == 4 && xhttp.status == 201) {
			      		commentRender(formData.get('name'), formData.get('comment'));
			      		document.querySelector("form").reset();
			    	}
			  	};

		 	 	xhttp.open("POST", url, true);
		  		xhttp.send(formData);
	  		

	  		return false;
		}	
		var articleComment = document.createElement('article');
		function commentRender(name, comment) {
			var divName = document.createElement('div');
			divName.className = ('userName');
			divName.innerHTML = name;

			var divComment = document.createElement('div');
			divComment.className = ('userComment');
			divComment.innerHTML = comment;

			
			articleComment.className = ('comment');
			articleComment.appendChild(divName);
			articleComment.appendChild(divComment);

			var theFirstChild = document.getElementsByClassName('comments')[0].firstChild;
			var sectionComments = document.getElementsByClassName('comments')[0].insertBefore(articleComment, theFirstChild);
 		}

  		function getComments(pageId) {				
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					var comments = JSON.parse(xhttp.responseText);

					while (articleComment.lastChild) {
						articleComment.removeChild(articleComment.lastChild);
					}				

		  			for(var i = 0; i < comments.length; i++) {
	  					commentRender(comments[i].name, comments[i].comment);	
	  				}
				}

			};

	 	 	xhttp.open("GET", '/comments/' + pageId, true);
	  		xhttp.send();

	  		return false;
		}
$(document).ready(function() {
	
	// Vars + Refs + Handlebars init
	var apiUrl = 'https://flynn.boolean.careers/exercises/api/array/music';
	var container = $('.cds-container');
	var logoContainer = $('.container > img');
	var cdTemplate = Handlebars.compile($('#box-template').html());
	var selectTemplate = Handlebars.compile($('#select-template').html());
	var optionsTemplate = Handlebars.compile($('#options-template').html());
	var genresList = [];

	// API call to populate container first time
	$.ajax({
		url: apiUrl,
		method: 'GET',
		success: (data) => {
			albums = data.response;
			albums.forEach(item => {
				var cd = {
					imgUrl: item.poster,
					title:  item.title,
					author: item.author,
					genre:  item.genre,
					year:   item.year
				}
				container.append(cdTemplate(cd));
				if(!genresList.includes(item.genre)) {
					genresList.push(item.genre);
				}
			}, setTimeout(createSelect, 1000)); // Callback function at the end of albums.forEach to create a selectbox
		}, 
		error: () => console.log('Error')
	}); // End of API call

	// Select
	$(document).on('change', '#genre-select', function() {
		// API call
		var self = $(this).val();
		$.ajax({
			url: apiUrl,
			method: 'GET',
			success: (data) => {
				refresh(container);
				albums = data.response;
				albums.forEach(item => {
					if(item.genre === self || self === 'all') {
						var cd = {
							imgUrl: item.poster,
							title:  item.title,
							author: item.author,
							genre:  item.genre,
							year:   item.year
						}
						container.append(cdTemplate(cd));
					}
				}); // end of albums.forEach
			}, 
			error: () => console.log('Error')
		}); // End of API call
	}); // End of change event on select


	// Functions
	function createSelect() {
		logoContainer.parent().append(selectTemplate);
		createOptions('All genres', 1);
		genresList.forEach(item => { createOptions(item); });
	}

	function createOptions(text, first) {
		var data = { option: text };
		if(first === 1) {
			data.value = 'all';
			data.selected = 'selected';
		} else {
			data.value = text;
		}			
		$('select').append(optionsTemplate(data));
	}

	function refresh(ref) {
		ref.html('');
	}

	
}); // End of ready function
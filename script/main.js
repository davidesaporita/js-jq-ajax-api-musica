$(document).ready(function() {
	
	// Vars
	var apiUrl = 'https://flynn.boolean.careers/exercises/api/array/music';

	// Refs
	var container = $('.cds-container');

	// Handlebars init
	var cdTemplate = Handlebars.compile($('#box-template').html());

	// API call
	$.ajax({
		url: apiUrl,
		method: 'GET',
		success: (data) => {
			disks = data.response;
			disks.forEach(item => {
				var cd = {
					imgUrl: item.poster,
					title:  item.title,
					author: item.author,
					year:   item.year
				}
				container.append(cdTemplate(cd));
			});
		},
		error: () => console.log('Error')

	}); // End of API call

}); // End of ready function
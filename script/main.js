$(document).ready(function() {
	
	// Vars
	var apiUrl = 'https://flynn.boolean.careers/exercises/api/array/music';

	// Refs
	var container = $('.cds-container');

	// Handlebars init
	var cdTemplate = Handlebars.compile($('#box-template').html());

	// Handlebars test
	var data = {
		imgUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Ten_Summoner%27s_Tales.jpg',
		title: 'Titolo',
		author: 'Autore',
		year: '1984'
	}
	
	container.append(cdTemplate(data));

});
var nearBeer = {};

nearBeer.apiKey = "MDpjYTZlYjVmNC0zZmY4LTExZTctODMxMi0wYmM3MjIzM2E3OTc6QXRvdlhDZk15NVlidUVab29WU0pDc1B1RW5IUDlWUERkNFhy"
nearBeer.baseApiUrl = 'http://lcboapi.com/products';

nearBeer.init = function() {
	nearBeer.getBeersOnSale();
	// nearBeer.displayBeersOnSale();
}

nearBeer.getBeersOnSale = function() { 

	$.ajax({
	  url: nearBeer.baseApiUrl,
	  method: 'GET',
	  dataType: 'json',
	  headers: {
	  'Authorization': 'Token token=' + nearBeer.apiKey
	   },	
	  data: {
				format: 'json',		// something to with headers - we don't really see it
				per_page : 100,
				q: "Beer",
				has_limited_time_offer : true
			}
	})//closing ajax

	.then(function(beerData) {  
	//Callback from a server if the ajax call is good - after we make the call above, do something with the response
	 nearBeer.displayBeersOnSale(beerData.result) 
	 //beerData is ALL the data, .result is all of the results from the Ajax request
	});
};


// Display only the beers that are on sale along with their images and name
nearBeer.displayBeersOnSale = function(beerResults) {
// beerResults returns an array of beer objects
	
 	//Creates an html element 
	const ul = $('<ul>').addClass( "listOfBeer" );
	//Pushes html to the ul in the HTML  - starts empty
	$('#beerApp').append(ul) 
	beerResults.forEach( (singleBeer) => {
		if (singleBeer.has_limited_time_offer === true) {
			const beer = $('<li>') // empty box - create list item - both are start empty
			const beerName = $('<h2>')					
								.text(singleBeer.name)
			const beerImage = $('<img>')
								.attr('src', singleBeer.image_thumb_url)
			const beerSavings =	(singleBeer.regular_price_in_cents - singleBeer.price_in_cents) / 100;
		
			const displaySavings = $('<p>').text(`Money saved per six pack: $ ${beerSavings}`);
			const beerExpiry = $('<p>')
								.text(`On Sale Until: ${singleBeer.limited_time_offer_ends_on}`)

			beer.append(beerName, beerImage, displaySavings, beerExpiry);
								
			ul.append(beer);	//appending the li to the ul here
		}
	});
};


$(document).ready(function(){
 
  $('.beerButton').click(function(){
		//this code runs once the button has been clicked
		nearBeer.getBeersOnSale();
		$(this).fadeOut()			
 	});
});
//closing doc ready











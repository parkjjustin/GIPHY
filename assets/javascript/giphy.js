var topics = ["dog", "cat", "pig", "snake", "monkey", "rat", "tiger", "dragon", "ox", "rooster", "rabbit", "horse"]

function displayAnimals() {
	$(".giphys-appear").empty();

	$(".button-topic").css("background-color", "gray");
	$(this).css("background-color", "#444");

	var animal = $(this).data("topic");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal +"&api_key=dc6zaTOxFJmzC"
	$.ajax({url: queryURL, method: 'GET'})


		.done(function (response) {
			for (var i = 0; i < 10; i++) {
				var div = $("<div>");
				div.attr("id", "giphyHolder");
				var rating = response.data[i].rating.toUpperCase();
				var gifImg = $("<img>");
				gifImg.addClass("giphy");
				gifImg.attr("data-still", response.data[i].images.fixed_height_still.url);
				gifImg.attr("data-animate", response.data[i].images.fixed_height.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("src", response.data[i].images.fixed_height_still.url);
				div.append("<p>Rating: " + rating + "</p>");
				div.append(gifImg);
				$(".giphys-appear").append(div);
			}

		$(".giphy").on('click', function() {
			var state = $(this).attr("data-state")
			if (state === "still") {
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state","animate");
			} else if (state === "animate") {
				$(this).attr("src", $(this).attr("data-still"));
				$(this).attr("data-state", "still");
			}
		})

		}) .fail(function(err) {
		   throw err;
		});

}

function renderButtons() {
	$(".button-container").empty();
	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.addClass("button-topic");
		button.attr("data-topic", topics[i]);
		button.text(topics[i].toUpperCase());
	$(".button-container").append(button);
	
	}
};


$("#addTopic").on("click", function() {
	var push = $("#topic-input").val().toLowerCase().trim();
	for (var i = 0; i < topics.length; i++){
		if (topics.indexOf(push) === i){
		alert("That category already exists");
		return false;
	}
}

	if (push !== "") {
		topics.push(push);
		renderButtons();
	}
		return false;
});

renderButtons();

$(document).on('click', '.button-topic', displayAnimals);
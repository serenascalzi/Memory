$(document).ready(function() {

	const main = document.querySelector("#gameboard")

	var iconArray = [
	"&#9728;",  // sun
	"&#9728;",  // sun
	"&#9730;",  // umbrella
	"&#9730;",  // umbrella
	"&#9836;",  // music
	"&#9836;",  // music
	"&#9992;",  // airplane
	"&#9992;",  // airplane
	"&#9998;",  // pencil
	"&#9998;",  // pencil
	"&#10030;", // star
	"&#10030;", // star
	"&#10048;", // flower
	"&#10048;", // flower
	"&#10052;", // snowflake
	"&#10052;", // snowflake
	"&#10163;", // arrow
	"&#10163;"  // arrow
	]

	var icons = iconArray.sort(function(a, b) {
		return 0.5 - Math.random()
	})

	const board = icons.map(item => {
		return `<div><button class="start">${item}</button></div>`
	}).join('\n')

	main.innerHTML = board

	var choices = {
		first: null,
		second: null
	}

	var icon1 = {}
	var icon2 = {}

	var turns = 15
	$('#turns').html('<p>Turns: ' + turns + '</p>')

	var results = ''
	$('#results').html('<p>Select two cards...</p>')

	var begin = new Date().getTime()

	var counter = setInterval(function() {
		function leadZero(i) {
			if (i < 10) {
				i = '0' + i
			} return i
		}
		var end = new Date().getTime()
		var elapsed = end - begin
		var minutes = leadZero(Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)))
		var seconds = leadZero(Math.floor((elapsed % (1000 * 60)) / 1000))
		var clock = `${minutes}:${seconds}`
		$('#clock').html('<p>Time: ' + clock + '</p>')
	},1000)

	$('#gameboard').on('click', 'button', function() {
		var choice = $(this).html()

		if (choices.first == null) {
			choices.first = choice + ''
			icon1 = this
			$(icon1).addClass('active')

		} else {
			choices.second = choice + ''
			icon2 = this
			$(icon2).addClass('active')

			if (choices.first == choices.second) {
				setTimeout(function() {
					$(icon1).removeClass('start')
					$(icon1).removeClass('active')
					$(icon1).addClass('match')
					$(icon2).removeClass('start')
					$(icon2).removeClass('active')
					$(icon2).addClass('match')
					$('#turns').html('<p>Turns: ' + turns + '</p>')
				}, 500)
				setTimeout(function() {
					if ($('button').hasClass('start') && turns == 0) {
						results = '<p>You have lost &mdash; <a class="title" href="index.html">Play again!</a></p>'
						clearInterval(counter)
					} else if ($('button').hasClass('start') && turns >= 1) {
						results = '<p>Keep playing.</p>'
					} else {
						results = '<p>You have won &mdash; <a class="title" href="index.html">Play again!</a></p>'
						clearInterval(counter)
					}
					$('#results').html(results)
				}, 1000)

			} else {
				setTimeout(function() {
					$(icon1).removeClass('active')
					$(icon2).removeClass('active')
					turns--
					$('#turns').html('<p>Turns: ' + turns + '</p>')
				}, 500)
				setTimeout(function() {
					if ($('button').hasClass('start') && turns == 0) {
						results = '<p>You have lost &mdash; <a class="title" href="index.html">Play again!</a></p>'
						clearInterval(counter)
					} else if ($('button').hasClass('start') && turns >= 1) {
						results = '<p>Keep playing.</p>'
					} else {
						results = '<p>You have won &mdash; <a class="title" href="index.html">Play again!</a></p>'
						clearInterval(counter)
					}
					$('#results').html(results)
				}, 1000)
			}

			choices.first = null;
			choices.second = null;
		}
	})

})
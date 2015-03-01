$ ->
	# removing phone links on desktop
	unless Modernizr.touch
		tel = $ 'a[href^=tel]'
		tel.parent().append tel.text()
		tel.remove()

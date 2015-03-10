# parameter should be the serializeArray()'s resoult on the form
formatFormInput = (serializedArray)->
	orig = serializedArray
	data = {}
	for dat in orig
		multivalue = 0
		multivalue++ for actual in orig when dat.name is actual.name
		if multivalue is 1 or !data[dat.name]?
			data[dat.name] = dat.value
		else
			data[dat.name] += ', ' + dat.value
	data


$ ->
	# removing phone links on desktop
	unless Modernizr.touch
		tel = $ 'a[href^=tel]'
		tel.parent().append tel.text()
		tel.remove()

		$("form.custom").submit (e)->
			self = $ this
			unless self.data('sent')?
				createHtmlApplication = ->
					data = formatFormInput(self.serializeArray())

					s = '<h2>Kære Ulla,</h2>'
					s += '<p>Navn: ' + data['name'] + '</p>'
					s += '<p>Adresse: ' + data['city'] + ', ' + data['address'] + '</p>'
					s += '<p>Telefon: ' + data['phone'] + '</p>'
					s += '<p>E-mail: ' + data['email'] + '</p>'
					s += '<p>Alder: ' + data['age'] + '</p>'
					s += '<p>Arbejdstidspunkt: ' + data['work-time'] + '</p>'
					s += '<p>Kørekort: ' + data['driver-license'] + '</p>'
					s += '<p>Transportmiddel: ' + data['transport'] + '</p>'
					s += '<p>Timer/dag: fra ' + data['daily-hours-min'] + ' til ' + data['daily-hours-max'] + '</p>'

					s += '<p>Arbejdsgiver: ' + data['employers'] + '</p>'
					s += '<p>Erfaring: ' + data['experience'] + '</p>'
					s += '<p>Bemærkninger: ' + data['comment'] + '</p>'

					s + '<br />'

				$.ajax
					type: "POST"
					url: "https://mandrillapp.com/api/1.0/messages/send.json"
					data:
						key: "vyEF8vosdHma7F6yQEAu4w"
						message:
							html: createHtmlApplication()
							subject: "Ny jobansøgninger"
							from_email: "ulla@abc-ren.dk",
							from_name: "ABC Rengøring og Hjemmepleje",
							to: [
								email: "kim@creabox.dk"
								#email: "ulla@abc-ren.dk"
								name: "Ulla"
							]
					beforeSend: ->
						$('button i', self).addClass 'icon-spin icon-refresh'
						$('button span', self).text 'Sender...'
					complete: ->
						$('button i', self).removeClass 'icon-spin icon-refresh'
						self.data 'sent', 'sent'
					success: ->
						$('button', self).addClass 'success'
						$('button span', self).text 'Tillykke, din anmodning er blevet sendt!'
					error: (xhr)->
						$('button', self).addClass 'alert'
						$('button span', self).text 'Der opstod en fejl, du bedes kontakte os!'
						console.error xhr

			e.preventDefault()
			e.stopPropagation()
			false
	@

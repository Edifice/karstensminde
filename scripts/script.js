(function() {
  var formatFormInput;

  formatFormInput = function(serializedArray) {
    var actual, dat, data, multivalue, orig, _i, _j, _len, _len1;
    orig = serializedArray;
    data = {};
    for (_i = 0, _len = orig.length; _i < _len; _i++) {
      dat = orig[_i];
      multivalue = 0;
      for (_j = 0, _len1 = orig.length; _j < _len1; _j++) {
        actual = orig[_j];
        if (dat.name === actual.name) {
          multivalue++;
        }
      }
      if (multivalue === 1 || (data[dat.name] == null)) {
        data[dat.name] = dat.value;
      } else {
        data[dat.name] += ', ' + dat.value;
      }
    }
    return data;
  };

  $(function() {
    var fancy;
    if (!Modernizr.touch) {
      $('a[href^=tel]').each(function() {
        var $this;
        $this = $(this);
        $this.parent().append($this.text());
        return $this.remove();
      });
      $("form.custom").submit(function(e) {
        var createHtmlApplication, self;
        self = $(this);
        if (self.data('sent') == null) {
          createHtmlApplication = function() {
            var data, s;
            data = formatFormInput(self.serializeArray());
            s = '<h2>Kære Ulla,</h2>';
            s += '<p>Navn: ' + data['name'] + '</p>';
            s += '<p>Adresse: ' + data['city'] + ', ' + data['address'] + '</p>';
            s += '<p>Telefon: ' + data['phone'] + '</p>';
            s += '<p>E-mail: ' + data['email'] + '</p>';
            s += '<p>Alder: ' + data['age'] + '</p>';
            s += '<p>Arbejdstidspunkt: ' + data['work-time'] + '</p>';
            s += '<p>Kørekort: ' + data['driver-license'] + '</p>';
            s += '<p>Transportmiddel: ' + data['transport'] + '</p>';
            s += '<p>Timer/dag: fra ' + data['daily-hours-min'] + ' til ' + data['daily-hours-max'] + '</p>';
            s += '<p>Arbejdsgiver: ' + data['employers'] + '</p>';
            s += '<p>Erfaring: ' + data['experience'] + '</p>';
            s += '<p>Bemærkninger: ' + data['comment'] + '</p>';
            return s + '<br />';
          };
          $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              key: "vyEF8vosdHma7F6yQEAu4w",
              message: {
                html: createHtmlApplication(),
                subject: "Ny jobansøgninger",
                from_email: "info@karstensminde.dk",
                from_name: "Karstensminde",
                to: [
                  {
                    email: "info@karstensminde.dk",
                    name: "Karstensminde"
                  }
                ]
              }
            },
            beforeSend: function() {
              $('button i', self).addClass('icon-spin icon-refresh');
              return $('button span', self).text('Sender...');
            },
            complete: function() {
              $('button i', self).removeClass('icon-spin icon-refresh');
              return self.data('sent', 'sent');
            },
            success: function() {
              $('button', self).addClass('success');
              return $('button span', self).text('Tillykke, din anmodning er blevet sendt!');
            },
            error: function(xhr) {
              $('button', self).addClass('alert');
              $('button span', self).text('Der opstod en fejl, du bedes kontakte os!');
              return console.error(xhr);
            }
          });
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    }
    fancy = $(".fancybox");
    if (fancy) {
      fancy.fancybox();
    }
    return this;
  });

}).call(this);

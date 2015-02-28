(function() {
  $(function() {
    var tel;
    if (!Modernizr.touch) {
      tel = $('a[href^=tel]');
      tel.parent().append(tel.text());
      return tel.remove();
    }
  });

}).call(this);

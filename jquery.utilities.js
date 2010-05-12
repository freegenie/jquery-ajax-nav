// This file is part of the jQuery AJAX nav framework
//
// (C) 2009-2010 Mind2Mind s.r.l

/**
 * Utility helper that logs to the Firebug/WebKit console, but
 * only if it is available in the current browser.
 */
$.log = function (message) {
  if (typeof (console) != 'undefined' && typeof (console.log) == 'function')
    console.log (message);
};

/**
 * Utility helper that clones the given object and returns a
 * newly created one. WARNING: does not recursively copies
 * nested objects!
 */
$.clone = function (obj) {
  return combine ({}, function (copy) {
    for (key in obj) copy[key] = obj[key];
  });
};

/**
 * Returns true or false whether the given event.client{X,Y} coordinates
 * are covered by this element area on the page or not.
 */
$.fn.covers = function (event) {
  return $.covers (event, $(this).offsetAndDimensions ());
};

/*
 * Returns true or false whether the given event.client{X,Y} coordinates
 * are covered by the given dimensions.
 */
$.covers = function (event, dimensions) {
  if (!(event.clientX && event.clientY))
    throw ("BUG: event given to $.covers () doesn't have client{X,Y} properties");

  return (
    event.clientX > dimensions.left &&
    event.clientX < (dimensions.left + dimensions.width) &&
    event.clientY > dimensions.top &&
    event.clientY < (dimensions.top + dimensions.height)
  );
};

/**
 * Returns a dimensions object ({top, left, width, height}) of the rectangle
 * that circumscribes the two given elements. If options.pad is set to an
 * integer value, the area is padded with the given pixels amount.
 */
$.circumscribe = function (a, b, options) {
  a = a.offsetAndDimensions ();
  b = b.offsetAndDimensions ();

  var area = {
    top:  Math.min (a.top, b.top),
    left: Math.min (a.left, b.left)
  };

  area.width  = Math.max (a.left + a.width, b.left + b.width) - area.left;
  area.height = Math.max (a.top + a.height, b.top + b.height) - area.top;

  if (options.pad) {
    var pad = parseInt (options.pad);
    area.top    -= pad;
    area.left   -= pad;
    area.width  += pad * 2;
    area.height += pad * 2;
  }

  // $.log ("Top: " + area.top + " Left: " + area.left +
  //  " Width: " + area.width + " Height: " + area.height);

  /* DEBUG
  var debug = $('<div/>').css ({position: 'fixed', border: '1px solid red',
    width: area.width + 'px', height: area.height + 'px',
    left: area.left, top: area.top, zIndex: 0});
  debug.attr ('id', 'circumscribeDebug');

  $('body').append (debug);
  */

  return area;
};

/**
 * The K combinator :-)
 */
function combine (ret, fn) {
  fn (ret);
  return ret;
}

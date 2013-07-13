/**
 * uptodate
 * Keeps the timestamps on your webpage up to date.
 * http://prezjordan.github.io/uptodate
 *
 * Copyright 2013 Jordan Scales (http://jordanscales.com)
 * Released under the MIT license
 * See LICENSE.txt
 */

/*jslint browser: true, evil: true, sloppy: true, vars: true,
         indent: 2, maxerr: 20, maxlen: 105, plusplus: true */

var time_ago_in_words;
var uptodate = function (options) {

  /* provide an empty options hash if we're found without one */
  options = options || {};

  var defaults = {
    /* by default, match class 'uptodate' */
    klass: 'uptodate',

    /* to fetch the timestamp, we will fetch the `data-time` attribute
       of the given element */
    timestamp: function (el) {
      return parseInt(el.getAttribute('data-time'), 10);
    },

    /* the default period is 1 minute (1000 * 60 ms) */
    period: 1000 * 60,

    /* uses the `time_ago_in_words` sample function (below) by default */
    formatter: time_ago_in_words
  };

  /* extend the defaults */
  options.klass     = options.klass     || defaults.klass;
  options.timestamp = options.timestamp || defaults.timestamp;
  options.period    = options.period    || defaults.period;
  options.formatter = options.formatter || defaults.formatter;

  /** timefix function
        this function will match all elements with class `klass`
        then extract a timestamp from the `attr` attribute
        and send it off to `formatter`
  */
  var timefix = function () {

    /* match all elements by class `klass` */
    var els = document.querySelectorAll('.' + options.klass);
    var el, i, ts;

    /* iterate over all matched elements */
    for (i = 0; el < els.length; i++) {
      el = els[i];

      /* fetch the timestamp from the `attr` attribute */
      ts = options.timestamp(el);

      /* send `ts` to the `formatter`
         and place the result in the elements HTML */
      el.innerHTML = options.formatter(ts);
    }
  };

  /* now, create a timer based on `period` to automatically call `timefix` */
  setInterval(timefix, options.period);

};

/* time_ago_in_words method based on ActionView's helper of the same name
     see the following for more information
     http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_ago_in_words
   
   It works by cycling through all the periods and providing the difference (`today` - `ts`) is more than
     that position in `lengths` it divides the difference by that same length until the conditions are no
     longer met when it then returns the full string.
     
   This method allows for easy expansion of the current periods ['second', 'minute' ... ] etc. Just add
     one to `periods` and add the length of the previous period (eg for decades, it would be 10 years)
     to `lengths`.

   The original PHP function that was converted over to JS can be found over @ css-tricks:
     http://css-tricks.com/snippets/php/time-ago-function/

   Feel free to send this output to other functions. For example:
     uptodate({ formatter: function(ts) { return time_ago_in_words(ts).toLowerCase() }; });
*/

time_ago_in_words = function (ts) {
  /* fetching a `from` and `to` time to work with deltas */

  if(difference < 60) 
    if(difference > 30)
      return '1 minute ago';
    else
      return 'Less than one minute ago';

  var periods = ['seconds','minute', 'hour', 'day', 'week', 'month', 'year'];
  var lengths = [60,60,24,7,4.35,12];

  var tense   = 'ago';

  for(var i = 0; difference >= lengths[i] && i < lengths.length; i++) {
    difference /= lengths[i];
  }

  difference = Math.round(difference);

  if(difference != 1) periods[i] += 's';
  
  return difference + ' ' + periods[i] + ' ' + tense;
}; 

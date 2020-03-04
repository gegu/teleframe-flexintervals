/**
 * introduces quicker image changes after interactions and slows down with time
 * @param  {AddonBase inherited} interface   object to register and send events
 */

const functionFlexIntervals = (interface) => {

  var config;
  var counter = 1;
  var isPaused = false;
  var changeTimeout = 0;

  interface.registerListener('teleFrame-ready', teleFrameObjects => {
    config = teleFrameObjects.config;
  });
  //interface.registerListener('newImage', (sender, type) => counter = 1);

  interface.registerListener(['images-loaded', 'imageDeleted', 'paused', 'muted',
    'recordStopped', 'unstarImage', 'starImage'],
    () => counter = 1);

  // additional handling for Äpaused' event.
  // if paused call clearTimeout
  interface.registerListener('paused', (status) => {
    isPaused = status;
    if (isPaused) {
      clearTimeout(changeTimeout);
    }
  });

  interface.registerListener('changedActiveImage', index => {
    // introduce an additional picture change:
    if (!isPaused && counter < config.imageCount) {
      var additionalChange = Math.round(config.interval*counter/config.imageCount);
      interface.logger.info("additional change in: " + additionalChange);
      changeTimeout = setTimeout(() => { interface.sendEvent('next'); }, additionalChange);
      counter += 1;
    };
  });
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = functionFlexIntervals;
}

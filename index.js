/**
 * introduces quicker image changes after interactions and slows down with time
 * @param  {AddonBase inherited} interface   object to register and send events
 */

const functionFlexIntervals = (interface) => {

  var config;
  var counter = 1;

  interface.registerListener('teleFrame-ready', teleFrameObjects => {
    config = teleFrameObjects.config;
  });
  //interface.registerListener('newImage', (sender, type) => counter = 1);

  interface.registerListener('images-loaded', () => counter = 1);

  interface.registerListener('imageDeleted', () => counter = 1);

  interface.registerListener('paused', (status) => counter = 1);

  interface.registerListener('muted', (status) => counter = 1);

  interface.registerListener('recordStopped', () => counter = 1);

  interface.registerListener('unstarImage', index => counter = 1);

  interface.registerListener('starImage', index => counter = 1);

  interface.registerListener('changedActiveImage', index => {
    // introduce an additional picture change:
    if (counter < config.imageCount) {
      var additionalChange = Math.round(config.interval*counter/config.imageCount);
      interface.logger.info("additional change in: " + additionalChange);
      setTimeout(() => { interface.sendEvent('next'); }, additionalChange);
      counter += 1;
    };
  });
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = functionFlexIntervals;
}

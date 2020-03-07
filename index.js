/**
 * introduces quicker image changes after interactions and slows down with time
 * @param  {AddonBase inherited} interface   object to register and send events
 */

const functionFlexIntervals = (interface) => {

  var config;
  // show the image for at least two seconds and
  // calculate the real value as soon as the config is available
  var minChangeTime = 2000;
  var counter = 1;
  var isPaused = false;
  var changeTimeout = 0;
  var nextChangeTime = 0;

  /**
   * Triggers the next image change if not paused
   * @param {number} additionalChange millisecond
   */
  const setChangeTimer = (additionalChange) => {
    clearTimeout(changeTimeout);
    if (!isPaused ) {
      // to enable logging execute: `~/TeleFrame/tools/addon_control flexInterval config logNextChangeInterval true`
      if (interface.config.logNextChangeInterval) {
        interface.logger.info("additional change in: " + additionalChange);
      }
      changeTimeout = setTimeout(() => {
        // show next image only if there was no user interaction
        if (!isPaused && new Date().getTime() >= nextChangeTime) {
          // use the half of the configured fadeTime
          interface.sendEvent('next', config.fadeTime / 2);
        }
      }, additionalChange);
    }
  };


  interface.registerListener('teleFrame-ready', teleFrameObjects => {
    config = teleFrameObjects.config;
    minChangeTime = Math.max(2000, Math.round(config.interval/config.imageCount));
  });
  //interface.registerListener('newImage', (sender, type) => counter = 1);

  interface.registerListener(['images-loaded', 'imageDeleted', 'paused', 'muted',
    'recordStopped', 'unstarImage', 'starImage'],
    () => {
      counter = 1;
      // trigger next change
      nextChangeTime = new Date().getTime() + minChangeTime;
      setChangeTimer(minChangeTime);
    });

  // additional handling for 'paused' event.
  // if paused call clearTimeout
  interface.registerListener('paused', (status) => {
    isPaused = status;
    if (isPaused) {
      clearTimeout(changeTimeout);
    }
  });

  interface.registerListener('changedActiveImage', index => {
    clearTimeout(changeTimeout);
    // detect manual image change
    if (new Date().getTime() < nextChangeTime) {
      counter = 1;
    }
    const additionalChange = Math.max(minChangeTime, Math.round(config.interval*counter/config.imageCount));
    nextChangeTime = new Date().getTime() + additionalChange;
    // introduce an additional picture change:
    if (!isPaused && counter < config.imageCount) {
      setChangeTimer(additionalChange);
      counter += 1;
    };
  });
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = functionFlexIntervals;
}

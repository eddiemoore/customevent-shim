/* global define: false */

(function (factory) {

  if (typeof define === 'function') {
    define(factory)
  } else {
    module.exports = factory.call(null)
  }

}(function () {

  var HAS_EVENT_INTERFACE = typeof window !== 'undefined' && typeof window.CustomEvent !== 'undefined'

  if (!HAS_EVENT_INTERFACE) {

    var CustomEvent // constructor, function

    /**
     * @constructor
     * @param {object} data (optional)
     */
    CustomEvent = function (type, data) {
      data = data || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      }

      this.setData(data)

      this.type = type
      this.isPropagationStopped = false
    }

    /**
     * @param {object} data
     * @return {void}
     * @throws {Error} if data argument is invalid
     */
    CustomEvent.prototype.setData = function (data) {
      var property

      if (typeof data !== 'object') {
        throw new Error('CustomEvent data is not an object.')
      }

      for (property in data) {
        if (data.hasOwnProperty(property)) {
          this[property] = data[property]
        }
      }
    }

    /**
     * @return {void}
     */
    CustomEvent.prototype.stopPropagation = function () {
      this.isPropagationStopped = true
    }
  }

  return CustomEvent

}))

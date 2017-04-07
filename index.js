var mongoose = require('mongoose')
var errmessage = 'remove function disabled for this schema'

module.exports = function (schema) {
  // disable Model.remove and document.remove
  schema.methods.remove = schema.statics.remove = function () {
    var error = new Error(errmessage)

    var args = Array.prototype.slice.call(arguments)
    var callback = args[args.length - 1]
    var isCallbackModel = typeof callback === 'function'

    if (isCallbackModel) {
      callback(error)
    } else {
      var MPromise = mongoose.Promise.ES6 || mongoose.Promise
      return new MPromise(function (resolve, reject) {
        reject(error)
      })
    }
  }
}

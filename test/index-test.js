var assert = require('power-assert')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var disableRemovePlugin = require('../index')

var TestSchema = new Schema({
  content: String
})

TestSchema.plugin(disableRemovePlugin)
var Test = mongoose.model('Test', TestSchema)

describe(process.env.npm_package_name, function () {
  var errmessage = 'remove function disabled for this schema'

  describe('Document.remove', function () {
    it('should throw with callback', function (done) {
      var test = new Test()
      test.remove(function (err) {
        assert.ok(err instanceof Error)
        assert.ok(err.message === errmessage)
        done()
      })
    })

    it('should return a reject promise if without callback', function (done) {
      var test = new Test()
      test.remove()
        .catch(function (err) {
          assert.ok(err instanceof Error)
          assert.ok(err.message === errmessage)
          done()
        })
    })

    it('should ok for custom promise', function (done) {
      var Promise = mongoose.Promise
      mongoose.Promise = require('bluebird')
      var test = new Test()
      test.remove()
        .catch(function (err) {
          assert.ok(err instanceof Error)
          assert.ok(err.message === errmessage)
          mongoose.Promise = Promise
          done()
        })
    })
  })

  describe('Model.remove', function () {
    it('should throw with callback', function (done) {
      Test.remove({}, function (err) {
        assert.ok(err instanceof Error)
        assert.ok(err.message === errmessage)
        done()
      })
    })

    it('should return a reject promise if without callback', function (done) {
      Test.remove({})
        .catch(function (err) {
          assert.ok(err instanceof Error)
          assert.ok(err.message === errmessage)
          done()
        })
    })

    it('should ok for custom promise', function (done) {
      var Promise = mongoose.Promise
      mongoose.Promise = require('bluebird')
      Test.remove()
        .catch(function (err) {
          assert.ok(err instanceof Error)
          assert.ok(err.message === errmessage)
          mongoose.Promise = Promise
          done()
        })
    })
  })
})

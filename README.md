# mongoose-plugin-disable-remove
A plugin that will disable remove functions for mongoose models.

If a schema enabled this schema, any call to `Model.remove` & `Document.remove` will return a reject promise or callback(err) if a callback provided.

![travis](https://img.shields.io/travis/isayme/mongoose-plugin-disable-remove.svg)
[![Coverage Status](https://coveralls.io/repos/github/isayme/mongoose-plugin-disable-remove/badge.svg?branch=master)](https://coveralls.io/github/isayme/mongoose-plugin-disable-remove?branch=master)

## Install
> npm install mongoose-plugin-disable-remove

## Example

````
var mongoose = require('mongoose')
var disableRemovePlugin = require('mongoose-plugin-disable-remove')

var YourSchema = new Schema({
  content: String
})
YourSchema.plugin(disableRemovePlugin)
````

## Test
> npm test

const {default: createElement} = require('./createElement')
const {default: Component} = require('./Component')
const {default: render} = require('./DOMRender')

module.exports = {
  createElement,
  Component,
  DOMRender: render
}
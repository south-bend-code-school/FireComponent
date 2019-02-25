export default function FireMessenger (_Vue) {
  this.bus = new _Vue()
  this.send = function (message) {
    this.bus.$emit(message)
  }
  this.save = function () {
    this.send('save')
  }
  this.reset = function () {
    this.send('reset')
  }
}

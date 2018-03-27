export function newImageBus (_Vue) {
  var bus = new _Vue();

  var newUpload = function (...params) {
    bus.$emit('newUpload', ...params)
  }

  return {
    bus,
    newUpload
  }
}

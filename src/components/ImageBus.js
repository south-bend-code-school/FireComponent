export default function ImageBus (_Vue) {
  this.bus = new _Vue();

  this.newUpload = function (...params) {
    bus.$emit('newUpload', ...params)
  };
}

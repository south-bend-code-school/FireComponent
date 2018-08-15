export default function ImageBus (_Vue) {
  this.bus = new _Vue();

  this.newUpload = function (...params) {
    this.bus.$emit('newUpload', ...params)
  };
}

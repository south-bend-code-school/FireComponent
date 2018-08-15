export default function EditableManager (_Vue) {
  this.bus = new _Vue();

  this.permissionChange = function (...params) {
    this.bus.$emit('permissionChange', ...params)
  };
}

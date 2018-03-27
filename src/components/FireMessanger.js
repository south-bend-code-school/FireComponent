export function newFireMessenger (_Vue) {
  var bus = new _Vue();
  var send = function (message) {
    bus.$emit(message);
  };
  var save = function () {
    send('save');
  };
  var reset = function () {
    send('reset');
  };
  return {
    bus,
    send,
    save,
    reset
  }
}

import Vue from 'vue';

var eventBus = new Vue();

var send = function(message) {
  eventBus.$emit(message);
};

var save = function() {
  send('save');
};

var reset = function() {
  send('reset');
};

export default {
  save: save,
  reset: reset,
  bus: eventBus,
}

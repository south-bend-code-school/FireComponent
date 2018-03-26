import Vue from 'vue';

var eventBus = new Vue();

export const bus = eventBus

export function newUpload (...params) {
  eventBus.$emit('newUpload', ...params)
}

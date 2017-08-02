import Vue from 'vue'

const eventBus = new Vue()

const send = (message) => {
  eventBus.$emit(message)
}

export default {
  save: () => send('save'),
  reset: () => send('reset'),
  bus: eventBus,
}

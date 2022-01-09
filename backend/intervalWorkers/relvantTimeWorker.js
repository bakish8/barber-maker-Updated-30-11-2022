import Clock from '../models/Clock.js'

const relvantTimeWorkerFactory = function () {
  return {
    run: function () {
      Clock.checkifRelvantforUser()
    },
  }
}

export default relvantTimeWorkerFactory()

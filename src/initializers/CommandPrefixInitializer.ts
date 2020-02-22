import Singleton from '../helpers/singleton'

export default function () {
  if (typeof process.env.COMMAND_PREFIX !== 'undefined' && process.env.COMMAND_PREFIX) {
    Singleton.setData('prefix', process.env.COMMAND_PREFIX)
  } else {
    Singleton.setData('prefix', '!!')
  }
}

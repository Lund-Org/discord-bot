import DataStore from '../helpers/dataStore'

export default async function () {
  if (typeof process.env.COMMAND_PREFIX !== 'undefined' && process.env.COMMAND_PREFIX) {
    DataStore.setData('prefix', process.env.COMMAND_PREFIX)
  } else {
    DataStore.setData('prefix', '!!')
  }
}

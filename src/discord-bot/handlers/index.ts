import MemeHandler from './MemeHandler'
import GachaHandler from './GachaHandler'
import BirthdayHandler from './BirthdayHandler'

export default [
  // Gacha needs to be first to give points
  GachaHandler,
  MemeHandler,
  BirthdayHandler
]

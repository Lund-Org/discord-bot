import PongHandler from './PongHandler'
import HelpHandler from './HelpHandler'
import MemeHandler from './MemeHandler'
import PollHandler from './PollHandler'
import GoogleHandler from './GoogleHandler'
import ProfilePictureHandler from './ProfilePictureHandler'
import JoinAtHandler from './JoinAtHandler'
import ShifumiHandler from './ShifumiHandler'
import GachaHandler from './GachaHandler'

export default [
  // Gacha needs to be first to give points
  GachaHandler,
  HelpHandler,
  MemeHandler,
  PollHandler,
  GoogleHandler,
  ProfilePictureHandler,
  ShifumiHandler,
  JoinAtHandler,
  PongHandler
]

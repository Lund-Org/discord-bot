import PongHandler from './PongHandler'
import HelpHandler from './HelpHandler'
import MemeHandler from './MemeHandler'
import PollHandler from './PollHandler'
import GoogleHandler from './GoogleHandler'
import ProfilePictureHandler from './ProfilePictureHandler'
import JoinAtHandler from './JoinAtHandler'
import ShifumiHandler from './ShifumiHandler'
import GatchaHandler from './GatchaHandler'

export default [
  // Gatcha needs to be first to give points
  GatchaHandler,
  HelpHandler,
  MemeHandler,
  PollHandler,
  GoogleHandler,
  ProfilePictureHandler,
  ShifumiHandler,
  JoinAtHandler,
  PongHandler
]

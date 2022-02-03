// import { StaticAuthProvider, AccessToken, ClientCredentialsAuthProvider  } from '@twurple/auth'
// import { PubSubClient, PubSubRedemptionMessage } from '@twurple/pubsub'
// import { createInterface } from 'readline'
// import { getConnection, getRepository } from 'typeorm'
// import { Config } from '../database/entities/Config'
// import { Player } from '../database/entities/Player'

// const scope = 'channel:read:redemptions'

// export const initTwitchPubSub = async () => {
//   let retry = true
//   let authProvider: StaticAuthProvider
//   let tokenData: AccessToken | null = null
//   const clientId = process.env.TWITCH_CLIENT_ID
//   const clientSecret = process.env.TWITCH_SECRET_ID

//   async function prompt () {
//     const question = 'Click on the link : https://api.twitch.tv/kraken/oauth2/authorize' +
//       '?response_type=token' +
//       '&client_id=' + clientId +
//       '&redirect_uri=' + encodeURI(process.env.TWITCH_REDIRECT_URL) +
//       '&scope=' + encodeURI(scope) + "\n"
//     console.log('Press enter to restart the connection')

//     const rl = createInterface({
//       input: process.stdin,
//       output: process.stdout
//     })

//     return new Promise<void>((resolve) => rl.question(question, () => {
//       rl.close();
//       resolve();
//     }))
//   }

//   async function getConfig() {
//     return getRepository(Config).findOne({ name: 'TWITCH_TOKENS' })
//   }

//   async function getAuthProvider(config: Config|null) {
//     try {
//       if (config) {
//         tokenData = config.value as unknown as AccessToken
//         console.log('Auth from cache')
//         const clientCredentialsAuthProvider = new ClientCredentialsAuthProvider(clientId, clientSecret)
        
//         tokenData = await clientCredentialsAuthProvider.getAccessToken()

//         authProvider = new StaticAuthProvider(clientId, tokenData.accessToken, [scope])
//         console.log('Auth done')
//         return true
//       } else {
//         throw new Error('No token data from cache')
//       }
//     } catch (err) {
//       console.log(err)
//     }

//     return false
//   }

//   async function listenToTwitch() {
//     const pubSubClient = new PubSubClient()
//     const userId = await pubSubClient.registerUserListener(authProvider, authProvider.clientId)

//     console.log('pubSubClient connected')
//     await pubSubClient.onRedemption(userId, async (message: PubSubRedemptionMessage) => {
//       console.log(userId, message);

//       return Promise.all([
//         getRepository(Player).findOne({ twitch_username: message.userName.toLowerCase() }),
//         getRepository(Config).findOne({ name: 'TWITCH_REWARD' })
//       ]).then(async ([player, twitchReward]) => {
//         if (!player || !twitchReward) {
//           return
//         }

//         const rewardData = twitchReward.value as unknown as { rewardName: string; points: number }

//         if (message.rewardTitle === rewardData.rewardName) {
//           await getConnection()
//             .createQueryBuilder()
//             .update(Player)
//             .set({ points: () => `points + ${rewardData.points}` })
//             .where('id = :id', { id: player.id })
//             .execute()
//         }
//       })
//     })
//   }

//   do {
//     const config = await getConfig()

//     console.log(config)
//     if (config) {
//       const isAuthAvailable = await getAuthProvider(config)

//       console.log(isAuthAvailable)
//       if (isAuthAvailable) {
//         await listenToTwitch()
//         retry = false
//       } else {
//         await prompt()
//       }
//     } else {
//       await prompt()
//     }

//   } while (retry)
// }

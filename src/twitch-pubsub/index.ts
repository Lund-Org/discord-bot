import { ApiClient, RefreshableAuthProvider, StaticAuthProvider } from 'twitch';
import { PubSubClient, PubSubRedemptionMessage } from 'twitch-pubsub-client';
import { createInterface } from 'readline'
import { getConnection, getRepository } from 'typeorm';
import { Config } from '../database/entities/Config';
import { Player } from '../database/entities/Player';

type TokenConfig = {
  accessToken: string;
  refreshToken: string | null;
  expiryDate: number | null;
}

const scope = 'channel:read:redemptions'

export const initTwitchPubSub = async () => {
  let retry = true;
  let authProvider: StaticAuthProvider;
  let tokenData: TokenConfig | null = null
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_SECRET_ID

  async function prompt () {
    const question = 'Click on the link : https://api.twitch.tv/kraken/oauth2/authorize' +
      '?response_type=token' +
      '&client_id=' + clientId +
      '&redirect_uri=' + encodeURI(process.env.TWITCH_REDIRECT_URL) +
      '&scope=' + encodeURI(scope) + "\n"
    console.log('Press enter to restart the connection')

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return new Promise((resolve) => rl.question(question, (answer) => {
      rl.close()
      resolve({
        accessToken: answer,
        refreshToken: null,
        expiryDate: null
      })
    }))
  }

  async function getConfig() {
    return getRepository(Config).findOne({ name: 'TWITCH_TOKENS' })
  }

  async function overwriteConfig(config?: Config) {
    if (!config) {
      config = new Config()
    }

    config.name = 'TWITCH_TOKENS'
    config.value = tokenData
    return getRepository(Config).save(config)
  }

  function getAuthProvider(config: Config) {
    try {
      tokenData = config.value as unknown as TokenConfig

      if (config) {
        console.log('Auth from cache')
        authProvider = new StaticAuthProvider(clientId, tokenData.accessToken, [scope])
        console.log('Auth done')
        return true;
      } else {
        throw new Error('Token data from cache')
      }
    } catch (err) {
      console.log(err)
    }

    return false;
  }

  async function setRefresher(config: Config) {
    const refreshableAuthProvider = new RefreshableAuthProvider(
      authProvider,
      {
        refreshToken: tokenData.refreshToken,
        clientSecret,
        expiry: tokenData.expiryDate ? new Date(tokenData.expiryDate) : null,
        onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
          tokenData = {
            accessToken,
            refreshToken,
            expiryDate: expiryDate === null ? null : expiryDate.getTime()
          }
          await overwriteConfig(config)
        }
      }
    );

    console.log('Refresh Auth done')
    const apiClient = new ApiClient({ authProvider: refreshableAuthProvider })
    console.log('Api client connected')
    const pubSubClient = new PubSubClient();
    const userId = await pubSubClient.registerUserListener(apiClient);

    console.log('pubSubClient connected')
    await pubSubClient.onRedemption(userId, async (message: PubSubRedemptionMessage) => {
      return Promise.all([
        getRepository(Player).findOne({ twitch_username: message.userName.toLowerCase() }),
        getRepository(Config).findOne({ name: 'TWITCH_REWARD' })
      ]).then(async ([player, twitchReward]) => {
        if (!player || !twitchReward) {
          return;
        }

        const rewardData = twitchReward.value as unknown as { rewardName: string; points: number }

        if (message.rewardName === rewardData.rewardName) {
          await getConnection()
            .createQueryBuilder()
            .update(Player)
            .set({ points: () => `points + ${rewardData.points}` })
            .where('id = :id', { id: player.id })
            .execute();
        }
      })
    });
  }

  do {
    const config = await getConfig();

    if (config) {
      const isAuthAvailable = getAuthProvider(config)

      if (isAuthAvailable) {
        await setRefresher(config)
        retry = false
      } else {
        await prompt()
      }
    } else {
      await prompt()
    }

  } while (retry);
}

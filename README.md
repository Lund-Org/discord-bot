# Discord-bot
Discord bot for the LundProd server

## Commands

- `npm run build`
Compile the TypeScript into Javascript to be executed with Node

- `npm run start`
Execute the compiled code built earlier

- `npm run test`
Run tests. Currently, they are not written.

- `npm run dev`
Chain the build and start command

- `npm run lint`
Run eslint on the project

## Bot features

The bot provides several slash commands :

|Command|Description|
|---|---|
|/help|Display the bot features|
|/birthday|Register your birth date|
|/google|Return a google search link for the subject specified|
|/howlongtobeat|Display the informations of a game|
|/join|Display when you joined the server|
|/ping|Answer pong|
|/pong|Answer ping|
|/poll|Create a poll (10 answers max.)|
|/pp|Get the profile picture of someone|
|/shifumi|To play rock-paper-cissors with the bot|

A game is also available thanks to this slash commands :
|Command|Description|
|---|---|
|/gacha help|Display the gacha commands|
|/gacha join|Register in the game|
|/gacha buy|Use points to get cards|
|/gacha cards|Display the cards of the user|
|/gacha daily|Get a free card for the day|
|/gacha fusion|Use several cards into a special one|
|/gacha gift|Use a code to get some gift|
|/gacha gold|Convert 5 same basic cards into a gold one|
|/gacha points|Display the points of the user|
|/gacha profile|Display some profile data and the url to the profile|
|/gacha sell|Sell a card to get points|
|/gacha twitch|Link a twitch account to your gacha account|
|/gacha view|Display a card by its id|

Another feature :
A meme channel is created or the bot attached to one depending on the env variable (see below)

The meme channel accepts urls finishing by .jpg, .jpeg, .gif, .png and .bmp, the message with an image (and no text) or the link from the whitelist which is tenor.com, giphy.com, imgur.com and twitter.com.

For the ping/pong, you have 1% chance to miss the table and you have 0.1% to win


## Initialization of the project

#### How to create and add the bot to your server

Go to your [discord applications](https://discordapp.com/developers/applications) and create a new app
Find your bot token in the bot menu
To make your bot join your server, go in the OAuth menu
Check "Bot"
In the url provided, replace `permissions=0` to `permissions=122406693968`
Your url should look like `https://discord.com/api/oauth2/authorize?client_id=<your client id>&permissions=122406693968&scope=bot%20applications.commands`
⚠ Be careful to have the `applications.commands` in the scope
Copy the url and use it to add the bot to your server

#### Environment variables

Copy the .env.dist as a .env

<u>Explanation of the variables :</u>

> **BOT_TOKEN**

The token of your bot. Can be found [here](https://discord.com/developers/applications) > Select application > Bot


> **DISCORD_CLIENT_ID**

The token of your bot. Can be found [here](https://discord.com/developers/applications) > Select application > OAuth2

> **DISCORD_GUILD_ID**

Enable the developper mode in your settings, then right click on the name of your server and select "Copy ID"

> **MEME_CHANNEL_ID**

The id of the channel you want to attach the meme stuff
Enable the developper mode in your settings, then right click on the channel and copy the id

> **MEME_CHANNEL_NAME**

The name of the meme channel if it's not found with the MEME_CHANNEL_ID. Be careful, the second time you start the bot, if you didn't register the MEME_CHANNEL_ID with the newly created channel, a new one will be created again.

> **BIRTHDAY_CHANNEL_ID**

The channel id where you want to wish happy birthday

> **PORT**

The port of the website

> **ENV**

The environnment name (test, prod...)

> **TWITCH_CLIENT_ID**
> **TWITCH_SECRET_ID**
> **TWITCH_REDIRECT_URL**

The informations from [the twitch console](https://dev.twitch.tv/console/apps) to communicate with the reward system

> **DOMAIN**

The domain url (*ex: https://my-domain.com*) for the Let's Encrypt ssl folder. Not used in dev mode (because it's localhost so not https)

#### Misc

A docker image for a database is available in the config folder

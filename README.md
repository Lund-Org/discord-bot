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

## Initialization of the project

Copy the .env.dist as a .env

|Env Variable|Description|
|---|---|
|BOT_TOKEN|The token of the bot|
|MEME_CHANNEL|The name of the meme channel (should only include it, not be exactly named like that)|
|COMMAND_PREFIX|The prefix behind each command. The default value is `!!` (if empty or not defined)|

Go to your [discord applications](https://discordapp.com/developers/applications) and create a new app
Find your bot token in the bot menu
To make your bot join your server, go in the OAuth menu
Check "Bot"
Check "Manage Channels" and "Manage Messages"
Copy the url provided and use it to add the bot to your server

## Bot features

For the following commands, we assume the prefix is the default one (`!!`).

|Command|Description|
|---|---|
|!!help|Display the bot features|
|!!google subject|Return a google search link for the subject specified|
|!!join|Display when you joined the server|
|!!poll [question] [answer 1] [answer 2] [...]|Create a poll (10 answers max.)|
|ping|Answer pong|
|pong|Answer ping|
|!!pp username|Get the profile picture URI|
|!!shifumi pierre&#124;feuille&#124;ciseaux|To play rock-paper-cissors with the bot|

A meme channel is created depending on the env variable MEME_CHANNEL
If you already have a channel which includes the name specified in the MEME_CHANNEL, it will use it (it avoids to create the same channel after each restart of the bot).

The meme channel accepts urls finishing by .jpg, .jpeg, .gif, .png and .bmp, the message with an image (and no text) or the link from the whitelist which is tenor.com, giphy.com and imgur.com.

For the ping/pong, you have 1% chance to miss the table and you have 0.1% win

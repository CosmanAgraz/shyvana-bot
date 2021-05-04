/*
Author: Sergio Cosman Agraz
Last updated: 05/03/2021

No warranty provided for this product.  Use at your own risk.
*/

"use strict";

require("dotenv").config();
const { getData } = require("./util/getData");

const Discord = require("discord.js");

const client = new Discord.Client();
const prefix = "~";

const main = async () => 
{
    // Fetch data once before initializing bot loop.
    const itemData = await getData("item");
    const summonerSpells = await getData("summoner");
    const championData = await getData("character");

    client.on("message", async message => 
    {

        // constraints
        if ( message.author.bot || !message.content.startsWith(prefix) ) { return };

        //parse message
        const command = message.content.slice(prefix.length);

        // response to `!factz` command
        if ( command === "brave" )
        {
            // TODO return brave build

            
        };

        if (command === "info" )
        {
            message.channel.send( " ``\n**About brave build**\nRandom champion, random summoner spells, random skill sequence, random items.  Are you brave?\n\n**Rules**\n**1.** You are guaranteed a pair of shoes in your build unless you get Cassiopea.\n**2.** If you roll a champion you do not own, roll again. **3.** Runes?  HA!  As if that will save you!``" );
        }

        if ( command === "help" )
        {
            message.channel.send( " ``\nCommands:\n **~brave**: Returns brave build\n\n **~info**: Specifies brave rules\n\n **~help**: Prints this message :thumbs_up:\n`` " );
        }
        // other commands here //
    });

    client.login(process.env.DISCORD_BOT_TOKEN);
}

main();
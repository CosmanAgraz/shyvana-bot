/*
Author: Sergio Cosman Agraz
Last updated: 05/07/2021
*/

"use strict";

require("dotenv").config();

const express = require('express');
const https = require('https');
const Discord = require("discord.js");

const { BraveBuild } = require("./BraveBuild");

const client = new Discord.Client();
const prefix = "~";

const app = express();
const PORT = process.env.PORT || 1988;

client.on("message", async message => 
{

    // constraints
    if ( message.author.bot || !message.content.startsWith(prefix) ) { return };

    //parse message
    const command = message.content.slice(prefix.length);

    // response to `!brave` command
    if ( command === "brave" )
    {
        let braveBuild = new BraveBuild();
        let champion = braveBuild.selectedChampion;
        let items = braveBuild.selectedItems;
        let summonerSpells = braveBuild.selectedSummonerSpells;
        let ability = braveBuild.selectedAbility;

        message.reply(`
        Champion:  **${champion}**
        Max first:  **${ability}**
        Summoner spells:  **${summonerSpells[0]}** & **${summonerSpells[1]}**
        Items: 
         • **${items[0]}**
         • **${items[1]}**
         • **${items[2]}**
         • **${items[3]}**
         • **${items[4]}**
         • **${items[5]}**`);

    };

    if (command === "info" )
    {
        message.reply(`
        **About brave build**
        Random champion, random summoner spells, random skill sequence, random items.  *Are you brave?*
        
        **Rules**
        1. You are guaranteed a pair of shoes in your build unless you get Cassiopea.
        2. If you roll a champion you do not own, buy it.  (or roll again like the tryhard you are)
        3. Runes?  HA!  Go look at probuilds.  As if **that** will save *you!*
        
        **LoL Patch**
        11.9.1

        **Bot version**
        1.1
        
        **Github Repo**
        https://github.com/CosmanAgraz/shyvana-bot`);
    }

    if ( command === "help" )
    {
        message.reply( `
        **Commands**
        \`\`~brave\`\` - Returns brave build
        \`\`~info\`\` - Specifies brave rules
        \`\`~help\`\` -  Prints this message :thumbs_up:`);
    }
    
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.get("/", (req, res) => {
    console.log(Date.now() + " Ping Received");
    res.sendStatus(200);
});

app.listen(PORT || 1988);

setInterval( () => 
{
    https.get(`${process.env.SERVER_ADDRESS}:${PORT}`);
}, 900000);
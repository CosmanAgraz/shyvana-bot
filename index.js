/*
Author: Sergio Cosman Agraz
Last updated: 05/07/2021
*/

"use strict";

require("dotenv").config();

const express = require('express');
const Discord = require("discord.js");

const { BraveBuild } = require("./BraveBuild");

const client = new Discord.Client();
const prefix = "~";

const app = express();
const PORT = process.env.PORT || 1988;

const icon = new Discord.MessageAttachment('./img/round-logo.png');
const logo = new Discord.MessageAttachment('./img/legacylogo.png');

client.on("message", async message => 
{

    // constraints
    if ( message.author.bot || !message.content.startsWith(prefix) ) { return };

    //parse message
    const command = message.content.slice(prefix.length);

    // response to `~brave` command
    if ( command === "brave" )
    {
        let braveBuild = new BraveBuild();
        let champion = braveBuild.selectedChampion;
        let items = braveBuild.selectedItems;
        let summonerSpells = braveBuild.selectedSummonerSpells;
        let ability = braveBuild.selectedAbility;

        let masteryRunes = braveBuild.runeBuild.masteryRunes;
        let statRunes = braveBuild.runeBuild.statRunes;

        //image
        let championImage = new Discord.MessageAttachment(`./img/champion/${champion}.png`);

        let embedBotMessage = 
        {
            color: 0x0099ff,
            title: 'Ultimate Bravery',
            thumbnail: {
                url: `attachment://${champion}.png`,
            },
            fields: [
                {
                    name: `${champion}`,
                    value: `Max **${ability}**`,
                    inline: true
                },
                {
                    name: 'Summoner Spells',
                    value: `**${summonerSpells[0]}** & **${summonerSpells[1]}**`,
                    inline: true,
                },
                {
                    name: 'Items',
                    value: `• ${items[0]}
                    • ${items[1]}
                    • ${items[2]}
                    • ${items[3]}
                    • ${items[4]}
                    • ${items[5]}`,
                    inline: false,
                },
                {
                    name: 'Runes',
                    value: `\u200b\u200b ${masteryRunes.keystone}
                    \u200b\u200b ${masteryRunes.pRune1}
                    \u200b\u200b ${masteryRunes.pRune2}
                    \u200b\u200b ${masteryRunes.pRune3}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: `\u200b\u200b ${masteryRunes.sRune1}
                    \u200b\u200b ${masteryRunes.sRune2}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: `\u200b\u200b ${statRunes.offenseRune}
                    \u200b\u200b ${statRunes.flexRune}
                    \u200b\u200b ${statRunes.defenseRune}`,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Sergio Cosman Agraz',
                icon_url: 'attachment://round-logo.png',
            },
        };
        
        message.channel.send({ files: [icon, championImage], embed: embedBotMessage });

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
        1.2
        
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
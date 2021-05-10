"use strict";
const FS = require("fs");

const rawChampionData = JSON.parse( FS.readFileSync("./static/champion.json", {encoding: "utf8"} ) );
const championData = rawChampionData.data;

// returns champion names in array
const getChampionData = () =>
{
    const championNames = [];
    
    for ( var key in championData )
    {
        if (championData.hasOwnProperty( key ))
        {
            championNames.push( key );
        }
    }

    return championNames;
}

// Returns Summoner Rift's summoner spells
const getValidSummonerSpells = () =>
{
    const rawSummonerSpellData = JSON.parse( FS.readFileSync("./static/summoner-spells.json", {encoding: "utf8"} ) );
    const validSummonerSpells = [];
    
    rawSummonerSpellData.forEach(key => {
    
        if ( key.gameModes.find( element => element === "CLASSIC") )
        {
            validSummonerSpells.push( key.name );
        }
    });

    return validSummonerSpells;
}

// Returns object containing valid items
const getValidItems = () => 
{
    const itemData = JSON.parse( FS.readFileSync("./static/item.json", {encoding: "utf8"} ) );
    let items = itemData.data;
    let mythicItems = [];
    let legendaryItems = [];
    let bootItems = [];
    
    for ( var key in items )
    {
        if ( items[key].depth === 3 && /(rarityMythic)/.test( items[key].description ) )
        {
            mythicItems.push(items[key].name);
        }
    
        // Constraints (in order):
        // 1. No Ornn items
        // 2. No recipe items (and no Doran items)
        // 3. No Corruption pot (techincally a "complete" item, but we don't want it)
        if ( items[key].depth < 4 && (items[key].depth > 1 && items[key].into === undefined) )
        {
            // check if boots
            for ( var tag in items[key].tags)
            {
                if ( items[key].tags[tag] === "Boots" )
                {
                    bootItems.push( items[key].name );
                }
            }
    
            // No boots in legendary items (technically, they are legendary items...), No Corrupting Pot, and NO SPATULAS!!
            if ( !(bootItems.includes(items[key].name)) && !(items[key].name === "Corrupting Potion") && !(items[key].name === "The Golden Spatula") )
            {
                legendaryItems.push(items[key].name);
            }
        }
    }

    return {
        mythic: mythicItems,
        legendary: legendaryItems,
        boots: bootItems
     } 
}

const champions = getChampionData();
const summonerSpells = getValidSummonerSpells();
const items = getValidItems();

module.exports = {
    champions,
    summonerSpells,
    items,
    championData
};
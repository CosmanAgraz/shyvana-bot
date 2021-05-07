"use strict";

const { pickRandomElements } = require("./util/helperFunctions");
const { champions, summonerSpells, items } = require("./util/getDataFromStatic");

class BraveBuild {
    constructor()
    {
        let itemStack = [];
        const abilities = ["Q", "W", "E"];

        // Randomly select 1 champion from array,
        this.selectedChampion = champions[ Math.floor( Math.random() * 10 ) % champions.length ];
        
        itemStack.push( pickRandomElements( items.mythic, 1) );
        // This special snowflake doesn't wear boots
        if (this.selectedChampion === "Cassiopeia")
        {
            itemStack.push( pickRandomElements( items.legendary, 5) );
        }
        else 
        {
            itemStack.push( pickRandomElements( items.boots, 1) );
            itemStack.push( pickRandomElements( items.legendary, 4) );
        }

        this.selectedItems = itemStack.flat();

        // Randomly select Q,W,E chars,
        this.selectedAbility = abilities[ Math.floor( Math.random() * 10 ) % abilities.length ];

        // Randomly select 2 DIFFERENT validSummonerSpells
        this.selectedSummonerSpells = pickRandomElements( summonerSpells, 2 );

    }
    
}

module.exports = { BraveBuild };
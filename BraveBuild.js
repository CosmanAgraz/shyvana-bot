"use strict";

const { pickRandomItems, pickRandomElements, getRandomIndex } = require("./util/arrayHelperFunctions");
const { champions, summonerSpells, items, championData } = require("./util/getDataFromStatic");
const { RuneBuild } = require("./RuneBuild");

class BraveBuild {
    constructor()
    {
        let itemStack = [];
        const abilities = ["Q", "W", "E"];

        // Randomly select 1 champion from array,
        this.selectedChampion = champions[ getRandomIndex( champions.length ) ];


        // check if selected champion is melee
        if (championData[this.selectedChampion].stats.attackrange < 199 )
        {
            this.isMelee = true;
        }
        
        itemStack.push( pickRandomElements( items.mythic, 1) );

        // This special snowflake doesn't wear boots
        if (this.selectedChampion === "Cassiopeia")
        {
            itemStack.push( pickRandomItems( items.legendary, 5, this.isMelee ) );
        }
        else 
        {
            itemStack.push( pickRandomElements( items.boots, 1 ) );
            itemStack.push( pickRandomItems( items.legendary, 4, this.isMelee ) );
        }

        // Object looks like [['mythic'],['boots'],[item, item, item ...]] so we flatten it 
        this.selectedItems = itemStack.flat();

        // Randomly select Q,W,E chars,
        this.selectedAbility = abilities[ Math.floor( Math.random() * 10 ) % abilities.length ];

        // Randomly select 2 DIFFERENT validSummonerSpells
        this.selectedSummonerSpells = pickRandomElements( summonerSpells, 2 );

        this.runeBuild = new RuneBuild();
    }
    
}

module.exports = { BraveBuild };
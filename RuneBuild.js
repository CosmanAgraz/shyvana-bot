"use strict";

const { runeData } = require("./util/getDataFromStatic");
const { pickRandomElements, getRandomIndex } = require("./util/arrayHelperFunctions");

class RuneBuild {
    constructor()
    {
        const offenseRunes = ["Adaptive Force", "Attack Speed", "Ability Haste"];
        const flexRunes = ["Adaptive Force", "Armor", "Magic Resist"];
        const defenseRunes = ["Health", "Armor", "Magic Resist"];

        this.statRunes = {
            offenseRune: offenseRunes[ Math.floor( Math.random() * 10 ) % offenseRunes.length ],
            flexRune: flexRunes[ Math.floor( Math.random() * 10 ) % flexRunes.length ],
            defenseRune: defenseRunes[ Math.floor( Math.random() * 10 ) % defenseRunes.length ]
        }


        // Randomly select 2 trees
        const masteryTrees = Object.keys(runeData);
        let selectedTrees = pickRandomElements( masteryTrees, 2 );
        let selectedSlots = pickRandomElements( [1,2,3], 2 );
        
        let primaryTree = selectedTrees[0];
        let secondaryTree = selectedTrees[1];

        //pick random runes for each slot
        this.masteryRunes = {
            keystone: runeData[ primaryTree ].slots[0].runes[ getRandomIndex( Object.keys( runeData[ primaryTree ].slots[0].runes ).length ) ].name,
            pRune1: runeData[ primaryTree ].slots[1].runes[ getRandomIndex( Object.keys( runeData[ primaryTree ].slots[1].runes ).length ) ].name,
            pRune2: runeData[ primaryTree ].slots[2].runes[ getRandomIndex( Object.keys( runeData[ primaryTree ].slots[2].runes ).length ) ].name,
            pRune3: runeData[ primaryTree ].slots[3].runes[ getRandomIndex( Object.keys( runeData[ primaryTree ].slots[3].runes ).length ) ].name,
            sRune1: runeData[ secondaryTree ].slots[selectedSlots[0]].runes[ getRandomIndex( Object.keys( runeData[ secondaryTree ].slots[selectedSlots[0]].runes ).length ) ].name,
            sRune2: runeData[ secondaryTree ].slots[selectedSlots[1]].runes[ getRandomIndex( Object.keys( runeData[ secondaryTree ].slots[selectedSlots[1]].runes ).length ) ].name
        }
    }
    
}

module.exports = { RuneBuild };
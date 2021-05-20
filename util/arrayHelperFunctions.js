"use strict";

//returns number between 0 and max (lenght of array)
const getRandomIndex = ( max ) => 
{
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max ) );
}

const shuffle = array => 
{
    // non-destructive
    let result = [...array];
    var currentIndex = result.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = result[currentIndex];
        result[currentIndex] = result[randomIndex];
        result[randomIndex] = temporaryValue;
    }

    return result;
}

const pickRandomElements = ( array, n ) =>
{
    let result = [];
    let shuffled = shuffle( array );

    for ( var i=0; i < n; i++ )
    {
        result.push( shuffled.pop() );
    }

    return result;
}

/*
@param String[] array: Target array to draw random items from
@param num n: Number of items to draw
@param bool isMelee: Determines which items are valid for the build
*/
const pickRandomItems = ( array, n, isMelee ) =>
{
    let itemStack = [];
    let shuffled = shuffle( array );

    for ( var i=0; i < n; i++ )
    {
        // Arbitrary constraints Go here
        // Basically, just pop without pushing to item stack if condition is met.

        /* Optimization notes:
        // array.prototype.includes() is O(n).  This would be pretty bad if the array would be large.
        // Set.has() is O(1).
        */

        if ( shuffled[ shuffled.length-1 ] === "Infinity Edge" && itemStack.includes("Guinsoo's Rageblade") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Guinsoo's Rageblade" && itemStack.includes("Infinity Edge") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Maw of Malmortius" && itemStack.includes("Sterak's Gage") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Sterak's Gage" && itemStack.includes("Maw of Malmortius") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Manamune" && itemStack.includes("Archangel's Staff") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Archangel's Staff" && itemStack.includes("Manamune") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Ravenous Hydra" && itemStack.includes("Titanic Hydra") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Titanic Hydra" && itemStack.includes("Ravenous Hydra") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Lord Dominik's Regards" && itemStack.includes("Serylda's Grudge") )
        {
            shuffled.pop();
        }

        if ( shuffled[ shuffled.length-1 ] === "Serylda's Grudge" && itemStack.includes("Lord Dominik's Regards") )
        {
            shuffled.pop();
        }

        if ( isMelee && shuffled[ shuffled.length-1 ] === "Runaan's Hurricane" )
        {
            shuffled.pop();
        }

        itemStack.push( shuffled.pop() );
    }

    return itemStack;
}

module.exports = { pickRandomElements, getRandomIndex, pickRandomItems };
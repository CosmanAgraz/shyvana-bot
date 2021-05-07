const shuffle = array => 
{
    // non-destructive
    let result = array;
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

module.exports = { pickRandomElements };
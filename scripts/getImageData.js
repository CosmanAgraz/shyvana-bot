/*
Do not run this script on the server.  Simply add
*/

'use strict'

const fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const { championData, items } = require('../util/getDataFromStatic');

async function downloadImage(champion)
{
    const id = champion.key;
    const name = champion.name;

    const url = `https://cdn.communitydragon.org/11.9.1/champion/${id}/square`;
    const path = Path.resolve( __dirname, "../", "img", "champion", `${name}.png` );
    const writer = fs.createWriteStream(path);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => 
    {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

const getChampionImages = () =>
{
    for ( const champion in championData )
    {
        downloadImage( championData[champion] );
    }

    return true;
}

getChampionImages();
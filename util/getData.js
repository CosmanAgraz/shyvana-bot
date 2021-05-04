"use strict";

const https = require('https');
const { version, region } = require('./config');

/* 
// Data =
// item: returns all items data
// champion: returns all champion data 
// summoner: returns all summoner spell data
*/
const getData = async (data) => 
{
    return new Promise( (resolve, reject) => 
    {

        const req = https.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${region}/${data}.json`, (res) => 
        {
            // Reject promise if sh.t goes wrong
            if (res.statusCode < 200 || res.statusCode >= 300) 
            {
                return reject(new Error(`statusCode: ${res.statusCode}`));
            }

            // allocate buffer data in an array
            let body = [];
            res.on('data', (chunk) =>
            {
                body.push(chunk);
            });


            // Try to convert data in 'body' array into read-able json format
            res.on('end', () =>
            {
                try
                {
                    body = JSON.parse( Buffer.concat(body).toString() );
                }
                catch(e)
                {
                    reject(e);
                }

                resolve(body);
            });
        });


        // Spit out error if sh.t goes wrong, and reject promise
        req.on('error', (e) => 
        {
            reject(e.message);
        });

        // send the request
         req.end();
    });
}

module.exports.getData = getData;
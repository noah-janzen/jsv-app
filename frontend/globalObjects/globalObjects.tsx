import React from 'react';

const globalObjects = {
    serverURL: 'https://www.jsv-huenxe.de/mock-server',
    //serverURL: 'http://localhost:3000',
    globalHeader: { 
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
        }
    }
};

export default globalObjects;
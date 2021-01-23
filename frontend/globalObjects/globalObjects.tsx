import React from 'react';

const globalObjects = {
    serverURL: 'https://www.jsv-huenxe.de/mock-server',
    //serverURL: 'http://10.0.2.2:3001',
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
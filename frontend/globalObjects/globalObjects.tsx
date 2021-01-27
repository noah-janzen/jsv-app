import React from 'react';
import * as Device from 'expo-device';

let osName = Device.osName;

const globalObjects = {
    serverURL: osName == 'Android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api',
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
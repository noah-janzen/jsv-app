import AsyncStorage from '@react-native-async-storage/async-storage';

// store data locally
const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

// get data from local storage
const getData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch(e) {
        // error reading value
    }
}  

export { storeData, getData };
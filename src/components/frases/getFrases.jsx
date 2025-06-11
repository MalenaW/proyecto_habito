import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetFrases = async () => {
    const response = await axios.get('https://zenquotes.io/api/random');
    return response.data;
}

export default GetFrases;
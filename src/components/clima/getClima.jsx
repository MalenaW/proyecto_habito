import axios from 'axios';

export const GetClima = async (lat, lon) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}&units=metric&lang=es`);
    return response.data;

}

export default GetClima;
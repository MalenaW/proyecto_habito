import axios from 'axios';

export const getRecetasSaludables = async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian');
  return res.data.meals.slice(0, 6);
};


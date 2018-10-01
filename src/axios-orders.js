import axios from 'axios';
//create axios instance w/ google firebase
const instance = axios.create({
    baseURL: 'https://react-my-burger-14d61.firebaseio.com/'
});

export default instance;
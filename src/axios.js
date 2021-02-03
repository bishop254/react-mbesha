import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-whine-d6334.cloudfunctions.net/'
    // 'http://localhost:5001/whine-d6334/us-central1/api'
});

export default instance;
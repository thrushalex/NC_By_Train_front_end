import axios from 'axios';

class RoutesDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/routes`);
    }

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new RoutesDataService();
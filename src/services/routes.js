import axios from 'axios';

class RoutesDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/routes`);
    }

    getRouteNames() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/routes/names`);
    }

    getRouteDestinationsByName(routeName) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/routes/routename/${routeName}/termini`);
    }

    getRouteStopsByName(routeName) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/routes/routename/${routeName}/stops`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new RoutesDataService();
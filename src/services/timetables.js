import axios from 'axios';

class TimetablesDataService {

    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/timetables`);
    }

    getTimetableByName(route, destination) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/timetables/routename/${route}/destination/${destination}`);
    }

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TimetablesDataService();
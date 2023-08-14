import axios from 'axios';

class ProfilesDataService {

    getProfile(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/profiles/${userId}`);
    }

    addProfile(profile) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/profiles`, profile);
    }

    updateProfile(profile) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/profiles`, profile);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new ProfilesDataService();
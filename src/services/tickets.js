import axios from 'axios';

class TicketsDataService {

    addTicket(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tickets`, data);
    }

    getTicketsByUserId(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tickets/user/${userId}`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TicketsDataService();
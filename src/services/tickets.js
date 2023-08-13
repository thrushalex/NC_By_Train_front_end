import axios from 'axios';

class TicketsDataService {

    addTicket(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tickets`, data);
    }

    getTicketsByUserId(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tickets/user/${userId}`);
    }

    activateTicketById(ticketId) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/tickets/activate`, ticketId);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TicketsDataService();
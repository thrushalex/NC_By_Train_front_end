import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";
import TicketsDataService from "../services/tickets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsPlus, BsDash } from "react-icons/bs";
import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

import './Ticket.css';

const Ticket = ({ user }) => {

    const [route, setRoute] = useState("Select a Route");
    const [origin, setOrigin] = useState("Select a Stop");
    const [destination, setDestination] = useState("Select a Stop");
    const [routeNames, setRouteNames] = useState([]);
    const [routeStops, setRouteStops] = useState(["Select a Stop"]);
    const [ticketCount, setTicketCount] = useState(0);
    const [tickets, setTickets] = useState([]);
    const [userId, setUserId] = useState("");
    const [ticketsPurchased, setTicketsPurchased] = useState(0);

    useEffect(() => {
        if (user) {
            setUserId(user.googleId);
        }
    }, [user])

    useEffect(() => {
        deleteExpiredTickets(userId);
    }, [userId])

    useEffect(() => {
        retrieveRoutes();
    }, [])

    useEffect(() => {
        retrieveTickets(userId);
    }, [userId, ticketsPurchased])

    useEffect(() => {
        retrieveRouteStops();
    }, [route])

    const retrieveRoutes = useCallback(() => {
        RoutesDataService.getRouteNames()
        .then(response => {
            setRouteNames(["Select a Route"].concat(response.data));
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    const retrieveRouteStops = useCallback(() => {
        if (route !== "Select a Route") {
            RoutesDataService.getRouteStopsByName(route)
            .then(response => {
                setRouteStops(["Select a Stop"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            })
        }
    }, [route])

    const retrieveTickets = (userId) => {
        TicketsDataService.getTicketsByUserId(userId)
        .then(response => {
            setTickets(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const deleteExpiredTickets = (userId) => {
        TicketsDataService.deleteExpiredTickets(userId)
        .then(response => {
            retrieveTickets(userId);
        })
        .catch(e => {
            console.log(e);
        })
    }

    const onChangeRoute = e => {
        setRoute(e.target.value);
        setOrigin("Select a Stop");
        setDestination("Select a Stop");
        retrieveRouteStops();
    }

    const onChangeOrigin = e => {
        setOrigin(e.target.value);
    }

    const onChangeDestination = e => {
        setDestination(e.target.value);
    }
    
    const purchase = () => {
        if (
            route !== "Select a Route" &&
            origin !== "Select a Stop" &&
            destination !== "Select a Stop" &&
            destination !== origin
        ) {
            const data = {
                userId: userId,
                route: route,
                origin: origin,
                destination: destination,
                quantity: ticketCount
            }       
            TicketsDataService.addTicket(data)
            .then(response => {
                setTicketsPurchased(ticketsPurchased + 1);
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            toast("Purchase not complete, please be sure to fill out all fields");
        }
    }

    const activateTicket = (ticketId) => {
        TicketsDataService.activateTicketById({ticketId: ticketId})
        .then(response => {
            retrieveTickets(userId);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const renderSelectBars = () => {
        if (user) {
            return (
                <Form>
                    <Row>
                        <Col>
                            Route
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeRoute}
                                >
                                    { routeNames.map((route, i) =>{
                                        return (
                                            <option value={route}
                                            key={i}>
                                                {route}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            Origin
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeOrigin}
                                >
                                    { routeStops.map((city, i) =>{
                                        return (
                                            <option value={city}
                                            key={i}>
                                                {city}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            Destination
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeDestination}
                                >
                                    { routeStops.map((city, i) =>{
                                        return (
                                            <option value={city}
                                            key={i}>
                                                {city}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        if (ticketCount > 0) {
                                            setTicketCount(ticketCount - 1);
                                        }
                                    }}>
                                <BsDash className="BsDash" />
                            </Button>
                        </Col>
                        <Col>
                            <div>
                                Ticket Qty: {ticketCount}
                            </div>
                        </Col>
                        <Col>
                            <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        setTicketCount(ticketCount + 1);
                                    }}>
                                <BsPlus className="BsPlus" />
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={purchase}
                            >
                                Purchase
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )
        } else {
            return(
                <div>
                    Please login to use this functionality
                </div>
            )
        }
    }

    const renderTicketDisplay = () => {
        if (user) {
            return(
                <Row>
                    { tickets?.map((ticket, index) => {
                        return (
                            <div key={index} className="ticket">
                                <Row>
                                    <Col>
                                    <div>
                                        Route: {ticket.route}
                                    </div>
                                    <div>
                                        Origin: {ticket.origin}
                                    </div>
                                    <div>
                                        Destination: {ticket.destination}
                                    </div>
                                    {ticket.expirationDate ? (
                                        <div>
                                            Expiration: {new Date(ticket.expirationDate).toLocaleTimeString("en-US")}
                                        </div>
                                    ) : (
                                        <div>
                                            Expiration: Not Active
                                        </div>
                                    )}
                                    </Col>
                                    <Col>
                                        {renderQRCode(ticket.expirationDate, ticket._id)}
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}
                </Row>
            )
        }
    }

    const renderQRCode = (expirationDate, ticketId) => {
        if (expirationDate == null) {
            return(
                <div>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={() => activateTicket(ticketId)}
                    >
                        Activate Ticket
                    </Button>
                </div>
            )
        } else {
            return(
                <QRCodeSVG value={ticketId} />
            )
        }
    }

    return (
        <div className="App">
            <ToastContainer position="top-center"/>
            <div className="ticketPurchaseContainer">
                {renderSelectBars()}    
                {renderTicketDisplay()}    
            </div>
        </div>
    )
}

export default Ticket;
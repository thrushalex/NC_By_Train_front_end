import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";
import TimetablesDataService from "../services/timetables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsPlus, BsDash } from "react-icons/bs";

import './Ticket.css';

const Ticket = ({ user }) => {

    const [route, setRoute] = useState("Select a Route");
    const [origin, setOrigin] = useState("Select a Stop");
    const [destination, setDestination] = useState("Select a Stop");
    const [routeNames, setRouteNames] = useState([]);
    const [routeStops, setRouteStops] = useState(["Select a Stop"]);
    const [ticketCount, setTicketCount] = useState(0);

    useEffect(() => {
        retrieveRoutes();
    }, [])

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

    const onChangeRoute = e => {
        setRoute(e.target.value);
        setOrigin("Select a Stop");
        setDestination("Select a Stop");
        retrieveRouteStops();
        console.log(route ,origin, destination);
    }

    const onChangeOrigin = e => {
        setOrigin(e.target.value);
    }

    const onChangeDestination = e => {
        setDestination(e.target.value);
    }
    
    const checkRouteOriginDestination = e => {
        console.log("route: ", route, "origin: ", origin, "destination: ", destination);
        toast("Wow so easy!");
    }

    const renderSelectBars = () => {
        if (user) {
            return (
                <Form>
                    <Row>
                        <Col>
                            Select Route
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
                            Select Origin
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
                            Select Destination
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
                                        console.log("minus clicked");
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
                                        console.log("plus clicked");
                                        setTicketCount(ticketCount + 1);
                                    }}>
                                <BsPlus className="BsPlus" />
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={checkRouteOriginDestination}
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

    return (
        <div className="App">
            <ToastContainer position="top-center"/>
            <div className="ticketContainer">
                {renderSelectBars()}
                <div>
                    Ticket display here
                </div>                
            </div>
        </div>
    )
}

export default Ticket;
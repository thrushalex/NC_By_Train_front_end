import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";
import TimetablesDataService from "../services/timetables";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Timetable.css';

const Timetable = props => {

    const [routeNames, setRouteNames] = useState([]);
    const [route, setRoute] = useState("");
    const [routeDestinations, setRouteDestinations] = useState([]);
    const [destination, setDestination] = useState("");
    const [timetable, setTimetable] = useState([]);

    const retrieveRouteNames = useCallback(() => {
        RoutesDataService.getRouteNames()
        .then(response => {
            setRouteNames(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    const retrieveRouteDestinations = useCallback(() => {
        RoutesDataService.getRouteDestinationsByName(route)
        .then(response => {
            setRouteDestinations(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }, [route])

    useEffect(() => {
        retrieveRouteNames();
    }, [])

    // Set routeName to first on element of array on page load, get destinations
    useEffect(() => {
        if (routeNames.length > 0) {
            setRoute(routeNames[0]);
        }
    }, [routeNames])

    // Get destinations based on default route
    useEffect(() => {
        retrieveRouteDestinations();
        if (routeDestinations.length > 0) {
            setDestination(routeDestinations[0]);
        }
    }, [route])

    // Set default destination based on default route
    useEffect(() => {
        if (routeDestinations.length > 0) {
            setDestination(routeDestinations[0]);
        }
    }, [routeDestinations])

    // Set default timetable based on default destination
    useEffect(() => {
        TimetablesDataService.getTimetableByName(route, destination)
        .then(response => {
            console.log(response.data);
            setTimetable(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }, [destination])

    const onChangeRoute = e => {
        const selectedRoute = e.target.value;
        setRoute(selectedRoute);
        retrieveRouteDestinations();
    }

    const onChangeDestination = e => {
        const selectedDestination = e.target.value;
        setDestination(selectedDestination);
    }

    const searchForTimetable = e => {
        console.log("Route is: ", route);
        console.log("Destination is: ", destination);
    }

    return (
        <div className="App">
            <Form>
                    <Row>
                        <Col>
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
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="select"
                                    onChange={onChangeDestination}
                                >
                                    { routeDestinations.map((rating, i) =>{
                                        return (
                                            <option value={rating}
                                            key={i}>
                                                {rating}
                                            </option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={searchForTimetable}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div>
                    { timetable.stops?.map((stop, index) => {
                        return (
                            <div key={index}>
                                {stop}
                                {timetable.times[index]}
                                { timetable.trains?.map((train, index2) => {
                                    return (
                                        <div key={index2}>
                                            {train}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default Timetable;
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

    // Set routeName to first on element of array on page load, get destinations
    useEffect(() => {
        if (routeNames.length > 0) {
            setRoute(routeNames[0]);
        }
    }, [routeNames])

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

    // Get destinations based on default route
    useEffect(() => {
        retrieveRouteDestinations();
        if (routeDestinations.length > 0) {
            setDestination(routeDestinations[0]);
            renderSearchBars();
        }
    }, [route])

    // Set default destination based on default route
    useEffect(() => {
        if (routeDestinations.length > 0) {
            setDestination(routeDestinations[0]);
        }
    }, [routeDestinations])

    const onChangeRoute = e => {
        const selectedRoute = e.target.value;
        setRoute(selectedRoute);
        retrieveRouteDestinations();
    }

    const onChangeDestination = e => {
        const selectedDestination = e.target.value;
        setDestination(selectedDestination);
    }

    const searchForTimetable = () => {
        console.log("Route is: ", route);
        console.log("Destination is: ", destination);
        if (route && destination) {
            TimetablesDataService.getTimetableByName(route, destination)
            .then(response => {
                console.log(response.data);
                setTimetable(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const renderSearchBars = () => {
        return (
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
        )
    }

    const renderTimeTable = () => {
        if (timetable.trains) {
            return(
                <table className="timetable">
                    <tr>
                        <th>
                            Stop
                        </th>
                        { timetable.trains?.map((train, index) => {
                                return (
                                    <th key={index}>
                                        Train {train}
                                    </th>
                                )
                            })}
                    </tr>
                    { timetable.stops?.map((stop, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {stop}
                                </td>
                                { timetable.trains?.map((train, index2) => {
                                    return (
                                        <td>
                                            {timetable.times[index][index2]}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </table>
            )
        }


    }

    return (
        <div className="App">
            <div className="timetableContainer">
                {renderSearchBars()}
                <div>
                    {renderTimeTable()}
                </div>                
            </div>
        </div>
    )
}

export default Timetable;
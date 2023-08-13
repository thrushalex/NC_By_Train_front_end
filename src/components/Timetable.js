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
    const [routeIndex, setRouteIndex] = useState(0);
    const [routeDestinations, setRouteDestinations] = useState([]);
    const [destination, setDestination] = useState("");
    const [destinationIndex, setDestinationIndex] = useState(0);
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
            setRoute(routeNames[routeIndex]);
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
        // if (routeDestinations.length > 0) {
        //     setDestination(routeDestinations[0]);
        //     renderSearchBars();
        // }
    }, [route])

    // Set default destination based on default route
    useEffect(() => {
        if (routeDestinations.length > 0) {
            setDestination(routeDestinations[destinationIndex]);
        }
    }, [routeDestinations])

    const onChangeRoute = e => {
        const len = e.target.value.length;
        const selectedRoute = e.target.value.substr(0,len - 2);
        const index = e.target.value[e.target.value.length - 1];
        setRoute(selectedRoute);
        setRouteIndex(index);
        retrieveRouteDestinations();
    }

    const onChangeDestination = e => {
        const len = e.target.value.length;
        const selectedDestination = e.target.value.substr(0,len - 2);
        const index = e.target.value[e.target.value.length - 1];
        setDestination(selectedDestination);
        setDestinationIndex(index);
    }

    const searchForTimetable = () => {
        if (route && destination) {
            TimetablesDataService.getTimetableByName(route, destination)
            .then(response => {
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
                        <div className="titleText">
                            Route
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                onChange={onChangeRoute}
                            >
                                { routeNames.map((route, i) =>{
                                    return (
                                        // <option value={[routea,i]}
                                        <option value={[route, i]}
                                        key={i}>
                                            {route}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <div className="titleText">
                            Direction
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                onChange={onChangeDestination}
                            >
                                { routeDestinations.map((destination, i2) =>{
                                    return (
                                        <option value={[destination, i2]}
                                        key={i2}>
                                            {destination}
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
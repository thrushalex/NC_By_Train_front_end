import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";
import Button from 'react-bootstrap/Button';

import './RoutesList.css';

const RoutesList = props => {

    const [routes, setRoutes] = useState([]);

    const retrieveRoutes = useCallback(() => {
        RoutesDataService.getAll()
        .then(response => {
            setRoutes(response.data.routesList)
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    useEffect(() => {
        retrieveRoutes();
    }, [])

    return (
        <div className="App">
            { routes.map((route, index) => {
                return (
                    <div className='routeContainer'>
                        <div className='routeName'>
                            {route.name}
                        </div>
                        <div className='routeDescription'>
                            {route.description}
                        </div>
                        <div className='routeButtons'>
                            <Button variant="link" onClick={() => {
                                // Show list of cities
                                console.log("hi");
                            }}>
                                View Timetable
                            </Button>
                            <Button variant="link" onClick={() => {
                                // Show list of cities
                                console.log("hi");
                            }}>
                                Buy Ticket
                            </Button>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RoutesList;
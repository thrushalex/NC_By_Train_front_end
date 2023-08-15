import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import RoutesDataService from "../services/routes";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './RoutesList.css';

const RoutesList = props => {

    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

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
                        <Row>
                            <div className='routeName'>
                                Route Name: {route.name}
                            </div>
                        </Row>
                        <Row>
                            <div className='routeDescription'>
                                Description: {route.description}
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        navigate("/timetable/");
                                    }}>
                                        <div>
                                            View Timetable
                                        </div>
                                </Button>
                            </Col>
                            <Col>
                                <Button 
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        navigate("/tickets/");
                                    }}>
                                        <div>
                                            Buy Ticket
                                        </div>
                                        
                                </Button>
                            </Col>
                        </Row>
                    </div>
                )
            })}
        </div>
    )
}

export default RoutesList;
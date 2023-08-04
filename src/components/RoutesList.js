import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";

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
            Placeholder text for RoutesList
            { routes.map((route, index) => {
                return (
                    <h5>
                        {route.name}
                        {route.description}
                        {route.cities}
                    </h5>
                )
            })}
        </div>
    )
}

export default RoutesList;
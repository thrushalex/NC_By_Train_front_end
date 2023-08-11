import React, { useState, useEffect, useCallback } from 'react';
import RoutesDataService from "../services/routes";
import TimetablesDataService from "../services/timetables";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Ticket.css';

const Ticket = props => {

    // const renderSearchBars = () => {
    //     return (
    //         <Form>
    //             <Row>
    //                 <Col>
    //                     <Form.Group className="mb-3">
    //                         <Form.Control
    //                             as="select"
    //                             onChange={onChangeRoute}
    //                         >
    //                             { routeNames.map((route, i) =>{
    //                                 return (
    //                                     <option value={[route, i]}
    //                                     key={i}>
    //                                         {route}
    //                                     </option>
    //                                 )
    //                             })}
    //                         </Form.Control>
    //                     </Form.Group>
    //                 </Col>
    //                 <Col>
    //                     <Form.Group className="mb-3">
    //                         <Form.Control
    //                             as="select"
    //                             onChange={onChangeDestination}
    //                         >
    //                             { routeDestinations.map((destination, i2) =>{
    //                                 return (
    //                                     <option value={[destination, i2]}
    //                                     key={i2}>
    //                                         {destination}
    //                                     </option>
    //                                 )
    //                             })}
    //                         </Form.Control>
    //                     </Form.Group>
    //                 </Col>
    //                 <Col>
    //                     <Button
    //                         variant="primary"
    //                         type="button"
    //                         onClick={searchForTimetable}
    //                     >
    //                         Search
    //                     </Button>
    //                 </Col>
    //             </Row>
    //         </Form>
    //     )
    // }

    return (
        <div className="App">
            <div className="ticketContainer">
                Ticket select here
                {/* {renderSearchBars()} */}
                <div>
                    Ticket display here
                </div>                
            </div>
        </div>
    )
}

export default Ticket;
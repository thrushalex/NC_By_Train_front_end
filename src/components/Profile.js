import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './Profile.css';

const Profile = props => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("United States");
    const [zipCode, setZipCode] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [cvv, setCVV] = useState("");

    const updateInformation = () => {
        console.log("First name is:", firstName);
        console.log("Last name is:", lastName);
        console.log("Address is:", address);
        console.log("City is:", city);
        console.log("State is:", state);
        console.log("Country is:", country);
        console.log("ZIP code is:", zipCode);
        console.log("Credit card number is:", creditCardNumber);
        console.log("CVV is:", cvv);
    }

    //Random CC and CVV number generation is to avoid storing real payment info during development
    const generateRandomCCNumber = () => {
        let min = Math.ceil(1000000000000000);
        let max = Math.floor(1999999999999999);

        return Math.floor(Math.random() * (max - min) + min);
    }

    const generateRandomCVV = () => {
        let min = Math.ceil(100);
        let max = Math.floor(999);

        return Math.floor(Math.random() * (max - min) + min);
    }

    return(
        <div className='profileContainer'>
            <ToastContainer position="top-center"/>
            <div className="titleText">
                Billing Information
            </div>
            <Row>
                <Col>
                    <div className='labelText'>
                        First name
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            // value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        Last name
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="Last name"
                        // value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        Address
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="Address"
                        // value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        City
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="City"
                        // value={address}
                        onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        State
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="State"
                        // value={address}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        Country
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        ZIP code
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="ZIP code"
                        // value={country}
                        onChange={(e) => setZipCode(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        Credit/Debit Card Number
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="Credit/Debit Card Number"
                        // value={country}
                        onChange={(e) => setCreditCardNumber(generateRandomCCNumber())}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='labelText'>
                        CVV
                    </div>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        placeholder="CVV"
                        // value={country}
                        onChange={(e) => setCVV(generateRandomCVV)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button
                    variant="primary"
                    type="button"
                    onClick={updateInformation}
                >
                    Update Information
                </Button>
            </Row>
        </div>
    )

}

export default Profile;
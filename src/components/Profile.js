import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProfilesDataService from "../services/profiles";

import './Profile.css';

const Profile = ({ user }) => {

    const [userId, setUserId] = useState("");
    const [profileExists, setProfileExists] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("MA");
    const [country, setCountry] = useState("United States");
    const [zipCode, setZipCode] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [cvv, setCVV] = useState("");
    const states = ["AL", "AK", "AZ", "AR", "AS", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP",
    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "TT", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"];

    useEffect(() => {
        if (user) {
            console.log("userId: ", user.googleId);
            setUserId(user.googleId);
        }
    }, [user])

    useEffect(() => {
        getProfile();
    }, [userId])

    const getProfile = useCallback(() => {
        ProfilesDataService.getProfile(userId)
        .then(response => {
            setProfileExists(true);
            loadProfile(response.data);
        })
        .catch(e => {
            console.log(e);
            if (e.response.data.error && e.response.data.error === "not found") {
                setProfileExists(false);
            }
        })
    }, [userId])

    const addProfile = () => {
        let profile = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            creditCardNumber: creditCardNumber,
            cvv: cvv,
        };
        ProfilesDataService.addProfile(profile)
        .then(response => {
            toast("Profile added!");
        })
        .catch(e => {
            console.log(e);
        })
    }

    const updateProfile = () => {
        let profile = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            creditCardNumber: creditCardNumber,
            cvv: cvv,
        };
        ProfilesDataService.updateProfile(profile)
        .then(response => {
            toast("Profile updated!");
        })
        .catch(e => {
            console.log(e);
        })
    }

    const loadProfile = (profile) => {
        setFirstName(profile.firstName);
        setlastName(profile.lastName);
        setAddress(profile.address);
        setCity(profile.city);
        setState(profile.state);
        setCountry(profile.country);
        setZipCode(profile.zipCode);
        setCreditCardNumber(profile.creditCardNumber);
        setCVV(profile.cvv);
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

    const checkAllFields = () => {
        if ( firstName !== "" && lastName !== "" && 
        address !== "" && city !== "" && 
        state !== "" && zipCode !== "" && 
        creditCardNumber !== "" && cvv !== ""    
        ) {
            return true;
        } else {
            return false;
        }
    }

    const submitProfile = () => {
        console.log("Profile exists", profileExists);
        console.log("All fields valid:", checkAllFields());
        if (checkAllFields() === true && profileExists === false) {
            addProfile();
            getProfile();
        } else if (checkAllFields() === true && profileExists === true) {
            console.log("Updating profile");
            updateProfile();
        }
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
                            value={firstName}
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
                        value={lastName}
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
                        value={address}
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
                        value={city}
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
                            as="select"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                        >
                            { states.map((aState, i) =>{
                                return (
                                    <option value={aState}
                                    key={i}>
                                        {aState}
                                    </option>
                                )
                            })}
                        </Form.Control>
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
                        // onChange={(e) => setCountry(e.target.value)}
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
                        value={zipCode}
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
                        value={creditCardNumber}
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
                        value={cvv}
                        onChange={(e) => setCVV(generateRandomCVV)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button
                    variant="primary"
                    type="button"
                    onClick={() => submitProfile()}
                >
                    Update Information
                </Button>
            </Row>
        </div>
    )

}

export default Profile;
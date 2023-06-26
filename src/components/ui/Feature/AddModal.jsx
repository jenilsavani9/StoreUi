import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CONTEXT_TYPE } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider'
import { AddFeaturesService } from '../../../services/Features';



function AddModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const [featureName, setFeatureName] = useState("");
    const [featureDescription, setFeatureDescription] = useState("");

    const [{ }, dispatch] = useStateValue();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (featureName.length >= 5) {
            setValidated(false);
            handleClose();
            const UserId = localStorage.getItem('UserId');
            const response = await AddFeaturesService(UserId, featureName, featureDescription)
            dispatch({
                type: CONTEXT_TYPE.ADD_FEATURE,
                features: response.data.payload
            })
            toast.success('🦄 Successfully Added!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
            setFeatureName("");
            setFeatureDescription("");
        } else {
            setValidated(true);
        }
    };


    return (
        <div>
            <Button variant="dark" onClick={handleShow}>
                <i className="bi bi-plus-lg"></i> Add Feature
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feature</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Feature Name</Form.Label>
                            <Form.Control type="text" placeholder="" required minLength={5} value={featureName} onChange={e => setFeatureName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Feature Name is not valid
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Feature Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={featureDescription} onChange={e => setFeatureDescription(e.target.value)} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddModal
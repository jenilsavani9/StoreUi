import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { CONTEXT_TYPE } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider';

function EditModal({ value }) {

    const [show, setShow] = useState(false);
    const [{ features }, dispatch] = useStateValue();
    const [featureId, setFeatureId] = useState();
    const [featureName, setFeatureName] = useState("");
    const [featureDescription, setFeatureDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        if(features != null) {
            const index = features.findIndex(
                (item) => item.featureId == event.target.value
            )
            setFeatureName(features[index]?.featureName)
            setFeatureDescription(features[index]?.featureDescription)
            setFeatureId(features[index]?.featureId)
        }
        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (featureName.length >= 5) {
            setValidated(false);
            handleClose();

            const decoded = jwt_decode(localStorage.getItem('token'));
            const response = await axios({
                method: 'put',
                url: `/api/feature`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: {
                    featuresId: featureId,
                    userId: decoded.UserId,
                    featuresName: featureName,
                    featuresDescription: featureDescription
                }
            })
            dispatch({
                type: CONTEXT_TYPE.EDIT_FEATURE,
                item: response.data.result[0]
            })
             // toast
             toast.success('🦄 Successfully Updated!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
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
            <Button className='btn btn-dark btn-sm' variant="dark" value={value} onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Feature</Modal.Title>
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

export default EditModal
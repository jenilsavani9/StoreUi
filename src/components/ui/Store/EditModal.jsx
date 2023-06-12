import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { MapLinkRegex, BASE_URL } from '../../../constants/regex';
import Swal from 'sweetalert2';
import { CONTEXT_TYPE } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider';
import { Form } from 'react-bootstrap';
import { EditStore } from '../../../services/Store';


function EditModal({ storesId }) {

    const [{ stores }, dispatch] = useStateValue();

    const [modalStore, setModalStore] = useState({
        storeId: "",
        storeName: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        locationLink: ""
    });

    const [show, setShow] = useState(false);

    const [errors, setErrors] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        const index = stores.findIndex(
            (item) => item.storeId == event.target.value
        )
        setModalStore({
            ...modalStore,
            "storeId": event.target.value,
            "storeName": stores[index].storeName,
            "addressLine1": stores[index].addressLine1,
            "addressLine2": stores[index].addressLine2,
            "postalCode": stores[index].postalCode,
            "locationLink": stores[index].locationLink
        })
        setShow(true);
    }
    const [validated, setValidated] = useState(false);

    const findFormErrors = () => {
        const { storeName, addressLine1, postalCode } = modalStore
        const newErrors = {}
        // name errors
        if (!storeName || storeName === '') newErrors.storeName = 'cannot be blank!'
        else if (storeName.length > 50) newErrors.storeName = 'storeName is not valid!'

        if (!addressLine1 || addressLine1 === '') newErrors.addressLine1 = "Address Line 1 is not valid!"

        if (postalCode < 999) newErrors.postalCode = "Postal Code is not valid!"

        return newErrors
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setValidated(true)
            setErrors(newErrors)
        } else {
            handleClose();
            const response = await EditStore(modalStore);
            dispatch({
                type: CONTEXT_TYPE.EDIT_STORE,
                item: response?.data?.result[0]
            })
        }

    };

    const changeHandler = e => {
        setModalStore({ ...modalStore, [e.target.name]: e.target.value })
    }

    return (
        <div>

            <Button variant="btn btn-dark btn-sm" value={storesId} onClick={handleShow}>
                Edit
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Store Name*</Form.Label>
                            <Form.Control type="text" placeholder="" required minLength={5} name='storeName' value={modalStore.storeName} onChange={changeHandler} />
                            <Form.Control.Feedback type="invalid">
                                Store Name is not valid
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address Line 1*</Form.Label>
                            <Form.Control as="textarea" rows={3} required value={modalStore.addressLine1} name='addressLine1' onChange={changeHandler} />
                            <Form.Control.Feedback type="invalid">
                                Address Line 1 is not valid!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address Line 2</Form.Label>
                            <Form.Control as="textarea" rows={3} value={modalStore.addressLine2} name='addressLine2' onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Postal Code*</Form.Label>
                            <Form.Control type="number" placeholder="" required min={999} value={modalStore.postalCode} name='postalCode' onChange={changeHandler} />
                            <Form.Control.Feedback type="invalid">
                                Postal Code is not valid
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location Link</Form.Label>
                            <Form.Control type="text" placeholder="" value={modalStore.locationLink} name='locationLink' onChange={changeHandler} />
                        </Form.Group>
                        <Form.Select aria-label="Default select example" value={stores[0].cityName}>
                            <option value={stores[0].cityName}></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        <Button className='mt-3' variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Modal.Body>
            </Modal>

        </div>
    )
}

export default EditModal
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import jwt_decode from "jwt-decode";
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';


import { CSVUpload, GetFeaturesByStoreId, GetStoresByUserId } from '../../../services/Store'
import { useStateValue } from '../../../contexts/StateProvider';
import { CONTEXT_TYPE } from '../../../constants/constant';


function FileUpload({ }) {
    const [show, setShow] = useState(false);

    const [{ stores }, dispatch] = useStateValue();
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tempStores, setTempStores] = useState([]);

    const [file, setFile] = useState();

    const saveFile = (event) => {
        setFile(event.target.files[0])
    }


    const fetchData = async () => {
        try {

            const UserId = localStorage.getItem('UserId')
            const response = await GetStoresByUserId(UserId, token);
            dispatch({
                type: CONTEXT_TYPE.SET_STORES,
                stores: response.data.payload
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const UserId = localStorage.getItem('UserId')
        const formData = new FormData();
        formData.append('FormFile', file);
        formData.append("UserId", UserId)
        try {
            await CSVUpload(formData);
            handleClose();
            fetchData();
            toast.success('🦄 Stores Added Successfully!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        } catch (error) {
            toast.error('🦄 Wrong file format!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        }
    }


    return (
        <>
            <Button variant="dark btn-sm" onClick={handleShow}>
                Add Multiple Store
            </Button>

            <Modal size='md' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Store with CSV File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sample File Format:</p>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CityName</th>
                                <th>AddressLine1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bugatti</td>
                                <td>Los Angeles</td>
                                <td>8833 W Olympic Blvd</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" onChange={saveFile} filetypes={'.csv'} />
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FileUpload
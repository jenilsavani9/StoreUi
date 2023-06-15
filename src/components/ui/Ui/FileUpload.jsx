import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import jwt_decode from "jwt-decode";


import { CSVUpload } from '../../../services/Store'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useStateValue } from '../../../contexts/StateProvider';
import { CONTEXT_TYPE } from '../../../constants/constant';

function FileUpload({  }) {
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

    async function GetStores() {
        try {
            var temp = [];
            const decoded = jwt_decode(token);
            const response = await axios({
                method: 'get',
                url: `/api/store?UserId=${decoded.UserId}`,
                headers: { Authorization: `Bearer ${token}` },
            })
            response.data.result.map(async item => {
                const StoreFeature = await axios({
                    method: 'get',
                    url: `/api/StoreFeature/Store?StoreId=${item.storeId}`,
                    headers: { Authorization: `Bearer ${token}` },
                })
                item['StoreFeature'] = await StoreFeature.data.result;
                // setTempStores(tempStores.push(item))
                temp.push(item);
            })
            dispatch({
                type: CONTEXT_TYPE.SET_STORES,
                stores: temp
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const decoded = jwt_decode(localStorage.getItem('token'));
        const formData = new FormData();
        formData.append('FormFile', file);
        formData.append("UserId", decoded.UserId)
        try {
            await CSVUpload(formData);
            handleClose();
            GetStores();
            toast.success('🦄 Stores Added Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            // toast
            toast.error('🦄 Wrong file format!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Csv Files Only</Form.Label>
                            <Form.Control type="file" onChange={saveFile} fileTypes={'.csv'} />
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
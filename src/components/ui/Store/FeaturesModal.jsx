import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';

import { CONTEXT_TYPE } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider';
import { LoadFeature } from '../../../services/Features';
import { ChangeStoreFeature } from '../../../services/StoreFeature';

function FeaturesModal({ storesId }) {

    const [show, setShow] = useState(false);
    const [{ stores, features }, dispatch] = useStateValue();
    const [options, setOptions] = useState();
    const handleClose = () => setShow(false);
    const [tempIds, setTempIds] = useState([]);

    const StoreFeatureIds = () => {
        var StoreFeatureId = []
        const index = stores.findIndex(
            (item) => item.id == storesId
        )
        stores[index].features?.map(item => {
            StoreFeatureId.push(item.id)
        })
        return StoreFeatureId;
    }

    const handleShow = async (event) => {
        if (features.length == 0) {
            const response = await LoadFeature();
            dispatch({
                type: CONTEXT_TYPE.SET_FEATURE,
                features: response.data.payload
            })
            setTempIds(StoreFeatureIds())
            setOptions(response.data.payload);
        } else {
            setTempIds(StoreFeatureIds())
            setOptions(features);
        }

        setShow(true);
    }

    const [validated, setValidated] = useState(false);

    const AddDeleteIdFromTempId = (event) => {
        var id = tempIds;
        if(id.includes(parseInt(event.target.value))){
            id.splice(id.indexOf(parseInt(event.target.value)), 1)
        } else {
            id.push(parseInt(event.target.value))
        }
        setTempIds(id)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ChangeStoreFeature(tempIds, storesId);
            const index = stores.findIndex(
                (item) => item.id == storesId
            )
            stores[index].features = response.data.payload;
            dispatch({
                type: 'CHANGE_STORE_FEATURE',
                item: response.data.payload,
                storesId: storesId
            })
            setShow(false);
        } catch (error) {
            
        }
    };


    return (
        <div>
            <Button className='btn btn-dark btn-sm ms-2' variant="dark" onClick={handleShow}>Features</Button>

            <Modal size="sm" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Features</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {options && options?.map((item, index) => {
                            if(tempIds.includes(item.id)){
                                return <h6 key={index}><Form.Check
                                key={index}
                                type='checkbox'
                                id={item.id}
                                label={item.name}
                                value={item.id}
                                defaultChecked
                                onChange={AddDeleteIdFromTempId}
                            /></h6>
                            } else {
                                return <h6 key={index}><Form.Check
                                key={index}
                                type='checkbox'
                                id={item.id}
                                label={item.name}
                                value={item.id}
                                onChange={AddDeleteIdFromTempId}
                            /></h6>
                            }
                            
                        })}
                        <hr />
                        <Button className='btn-sm' variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default FeaturesModal
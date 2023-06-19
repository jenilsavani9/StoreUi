import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';

import { useStateValue } from '../../../contexts/StateProvider';
import { LoadFeature } from '../../../services/Features';
import { CONTEXT_TYPE } from '../../../constants/constant';
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
            (item) => item.storeId == storesId
        )
        stores[index].StoreFeature?.map(item => {
            StoreFeatureId.push(item.featureId)
        })
        return StoreFeatureId;
    }

    const handleShow = async (event) => {
        if (features.length == 0) {
            const response = await LoadFeature();
            dispatch({
                type: CONTEXT_TYPE.SET_FEATURE,
                features: response.data.result
            })
            setTempIds(StoreFeatureIds())
            setOptions(response.data.result);
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
                (item) => item.storeId == storesId
            )
            stores[index].StoreFeature = response.data;
            dispatch({
                type: 'CHANGE_STORE_FEATURE',
                item: response.data,
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
                            if(tempIds.includes(item.featureId)){
                                return <h6 key={index}><Form.Check
                                key={index}
                                type='checkbox'
                                id={item.featureId}
                                label={item.featureName}
                                value={item.featureId}
                                defaultChecked
                                onChange={AddDeleteIdFromTempId}
                            /></h6>
                            } else {
                                return <h6 key={index}><Form.Check
                                key={index}
                                type='checkbox'
                                id={item.featureId}
                                label={item.featureName}
                                value={item.featureId}
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
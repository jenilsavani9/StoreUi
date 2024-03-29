import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CONTEXT_TYPE, TOAST_CONSTANT } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider';
import { EditFeatureService } from '../../../services/Features';

function EditModal({ value }) {

  const [show, setShow] = useState(false);
  const [{ features }, dispatch] = useStateValue();
  const [featureId, setFeatureId] = useState();
  const [featureName, setFeatureName] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    if (features != null) {
      const index = features.findIndex(
        (item) => item.id == event.target.value
      )
      setFeatureName(features[index]?.name)
      setFeatureDescription(features[index]?.description)
      setFeatureId(features[index]?.id)
    }
    setShow(true);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (featureName.length >= 5) {
      setValidated(false);
      handleClose();

      const UserId = localStorage.getItem('UserId');
      const response = await EditFeatureService(featureId, UserId, featureName, featureDescription)

      dispatch({
        type: CONTEXT_TYPE.EDIT_FEATURE,
        item: response.data.payload
      })
      // toast
      toast.success('🦄 Successfully Updated!', {
        position: TOAST_CONSTANT.position,
        autoClose: TOAST_CONSTANT.autoClose,
        theme: TOAST_CONSTANT.theme,
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
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import { CONTEXT_TYPE, TOAST_CONSTANT } from '../../../constants/constant';
import { useStateValue } from '../../../contexts/StateProvider';
import { DeleteFeatureService } from '../../../services/Features';
import EditModal from './EditModal';

function FeatureCard({ feature }) {

  const [{ }, dispatch] = useStateValue();

  async function deleteFeature(event) {

    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await DeleteFeatureService(event.target.value)
        dispatch({
          type: CONTEXT_TYPE.REMOVE_FEATURE,
          features: response.data.payload
        })
        toast.success('🦄 Successfully Deleted!', {
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
        });

      } else if (result.isDenied) {
        toast.error('🦄 Some Error Occurred!', {
          position: TOAST_CONSTANT.position,
          autoClose: TOAST_CONSTANT.autoClose,
          theme: TOAST_CONSTANT.theme,
        });
      }
    })


  }

  return (
    <div className='col-12 col-md-6 col-lg-4 mb-3 mb-sm-0'>
      <div className="card mt-4">
        <h5 className="card-header">{feature.name}</h5>
        <div className="card-body">
          <p className="card-text">{feature.description}</p>
          <div className='d-flex'>
            <EditModal value={feature.id} />
            <button className="btn btn-danger btn-sm ms-2" value={feature.id} type='button' onClick={deleteFeature}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
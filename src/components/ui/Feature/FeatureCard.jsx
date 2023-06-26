import React from 'react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditModal from './EditModal';
import { CONTEXT_TYPE } from '../../../constants/constant'
import { useStateValue } from '../../../contexts/StateProvider'
import { DeleteFeatureService } from '../../../services/Features';

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
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                });

            } else if (result.isDenied) {
                toast.error('🦄 Some Error Occurred!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
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
import React from 'react'
import { CONTEXT_TYPE } from '../../../constants/constant'
import { useStateValue } from '../../../contexts/StateProvider'
import axios from 'axios';
import Swal from 'sweetalert2';
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
                const response = await axios({
                    method: 'delete',
                    url: `/api/feature?FeatureId=${event.target.value}`,
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                dispatch({
                    type: CONTEXT_TYPE.REMOVE_FEATURE,
                    features: response.data.result
                })

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })


    }

    return (
        <div className='col-12 col-md-6 col-lg-4 mb-3 mb-sm-0'>
            <div className="card mt-4">
                <h5 className="card-header">{feature.featureName}</h5>
                <div className="card-body">
                    <p className="card-text">{feature.featureDescription}</p>
                    <div className='d-flex'>
                        <EditModal value={feature.featureId} />
                        <button className="btn btn-danger btn-sm ms-2" value={feature.featureId} type='button' onClick={deleteFeature}>Delete</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FeatureCard
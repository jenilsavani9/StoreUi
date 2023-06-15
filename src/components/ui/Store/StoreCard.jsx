import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Badge from 'react-bootstrap/Badge';


import EditModal from './EditModal';
import { useStateValue } from '../../../contexts/StateProvider';
import { CONTEXT_TYPE } from '../../../constants/constant';
import FeaturesModal from './FeaturesModal';


function StoreCard({ storesId,
    storeName,
    status,
    addressLine1,
    addressLine2,
    cityName,
    countryName,
    locationLink,
    StoreFeature }) {

    const [{ }, dispatch] = useStateValue();

    // func for delete store
    const reqForDeleteStore = async (data) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `/api/store/${data}`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch({
                type: CONTEXT_TYPE.REMOVE_STORE,
                item: response.data.result
            })
        } catch (error) {
            Swal.fire('Changes are not saved', '', 'error')
        }
    }

    const deleteStore = async (event) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {

            if (result.isConfirmed) {
                reqForDeleteStore(event.target.value);

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (

        <div className="col-12 col-md-6 col-lg-4 mb-3 mb-sm-0" key={storesId}>
            <div className="card" style={{ marginBottom: "25px" }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{storeName}</h5>
                        {/* <div className="card-text">{status == true ? <span className="badge text-bg-success">Open</span> : <span className="badge rounded-pill text-bg-danger">Closed</span>}</div> */}

                    </div>
                    

                    <div className="card-text text-body-tertiary">{`${(addressLine1 + addressLine2).substring(0, 40)}...`}</div>
                    
                    <div className="d-flex justify-content-between">
                        <div className="card-text">{cityName}, {countryName}</div>
                        <div className="card-text"><a className='btn btn-secondary btn-sm' role='button' href={locationLink} target="_blank"><i className="bi bi-geo-alt-fill"></i> Map</a></div>
                    </div>

                    <hr />
                    {StoreFeature && StoreFeature.length > 0 ? StoreFeature.map((item, index) => { return <Badge className='me-2' bg="warning" text="dark" key={index}>{item.featureName}</Badge> }) : <Badge bg="secondary" >No Feature Found</Badge>}

                    <hr />
                    {status == true ?
                        <div className='mt-2 d-flex justify-content-between'>
                            <div className='d-flex'>
                                <EditModal storesId={storesId} />
                                <button value={storesId} className="btn btn-danger btn-sm ms-2" type='button' onClick={deleteStore}>Delete</button>
                            </div>
                            <div>
                                <FeaturesModal storesId={storesId} />
                            </div>
                        </div>
                        : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default StoreCard
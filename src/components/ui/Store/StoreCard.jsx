import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditModal from './EditModal';
import { useStateValue } from '../../../contexts/StateProvider';
import { CONTEXT_TYPE } from '../../../constants/constant';


function StoreCard(props) {

    const nav = useNavigate();

    const [editResponse, setEditResponse] = useState({});

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

    // for edit the data
    async function LoadData(event) {
        const response = await axios({
            method: 'get',
            url: `/api/store/${event.target.value}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        dispatch({
            type: CONTEXT_TYPE.MODAL_STORE,
            item: response.data?.result[0]
        })
        setEditResponse(response);
    }

    return (

        <div className="col-12 col-md-6 col-lg-4 mb-3 mb-sm-0" key={props.storesId}>
            <div className="card" style={{ marginBottom: "25px" }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{props.storeName}</h5>
                        <div className="card-text">{props.status == true ? <span className="badge rounded-pill text-bg-success">Open</span> : <span className="badge rounded-pill text-bg-danger">Closed</span>}</div>

                    </div>
                    <hr />

                    <div className="card-text text-body-tertiary">{props.addressLine1 + props.addressLine2}</div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="card-text">{props.cityName}, {props.countryName}</div>
                        <div className="card-text"><a className='btn btn-secondary btn-sm' role='button' href={props.locationLink} target="_blank"><i className="bi bi-geo-alt-fill"></i> Map</a></div>
                    </div>

                    <hr />
                    {props.status == true ?
                        <div className='mt-2 d-flex'>
                            <EditModal storesId={props.storesId} />
                            <button value={props.storesId} className="btn btn-danger btn-sm ms-2" type='button' onClick={deleteStore}>Delete</button>
                        </div>
                        : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default StoreCard
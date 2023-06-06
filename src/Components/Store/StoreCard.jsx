import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import EditModal from './EditModal';
import { BASE_URL } from '../../constants/regex';

function StoreCard(props) {

    const nav = useNavigate();

    // func for delete store
    const reqForDeleteStore = async (data) => {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL.URL}/api/store/${data}`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            Swal.fire('Saved!', '', 'success').then(
                props.GetStores()
            )
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

        <div className="col-sm-4 mb-3 mb-sm-0" key={props.storesId}>
            <div className="card" style={{ marginBottom: "25px" }}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{props.storeName}</h5>
                        <div className="card-text">{props.status == "active" ? <span className="badge rounded-pill text-bg-success">Open</span> : <span className="badge rounded-pill text-bg-danger">Closed</span>}</div>

                    </div>
                    <hr />

                    <div className="card-text text-body-tertiary">{props.address}</div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="card-text">{props.cityName}, {props.countryName}</div>
                        <div className="card-text"><a className='btn btn-secondary btn-sm' role='button' href={props.locationLink} target="_blank"><i className="bi bi-geo-alt-fill"></i> Map</a></div>
                    </div>

                    <hr />
                    {props.status == "active" ? 
                    <div className='mt-2 d-flex'>
                        <EditModal value={props.storesId} GetStore={props.GetStores} />
                        <button value={props.storesId} className="btn btn-danger btn-sm ms-2" type='button' onClick={deleteStore}>Delete</button>
                    </div>
             : <div></div>}
                    </div>
            </div>
        </div>
    )
}

export default StoreCard
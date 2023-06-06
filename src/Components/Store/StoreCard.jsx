import React from 'react'

function StoreCard(props) {
    return (

        <div className="col-sm-4 mb-3 mb-sm-0" key={props.storesId}>
            <div className="card" style={{marginBottom: "25px"}}>
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{props.storeName}</h5>
                        <div className="card-text"><span className="badge rounded-pill text-bg-success">{props.status}</span></div>

                    </div>
                    <hr />

                    <div className="card-text text-body-tertiary">{props.address}</div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="card-text">{props.cityName}, {props.countryName}</div>
                        <div className="card-text"><a className='btn btn-secondary btn-sm' role='button' href={props.locationLink} target="_blank"><i className="bi bi-geo-alt-fill"></i> Map</a></div>
                    </div>

                    <hr />
                    <div className='mt-2'>
                        <a href="#" className="btn btn-dark btn-sm me-2">Edit</a>
                        <a href="#" className="btn btn-danger btn-sm">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreCard
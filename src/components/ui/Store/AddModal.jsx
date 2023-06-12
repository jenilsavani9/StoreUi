import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import 'bootstrap';

import { MapLinkRegex } from '../../../constants/regex';
import { useStateValue } from '../../../contexts/StateProvider';
import { CONTEXT_TYPE } from '../../../constants/constant';

function AddModal() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [{ user, stores }, dispatch] = useStateValue();

    const [tempStore, setTempStore] = useState([]);

    //dropdown list
    const [cityList, setCityList] = useState();
    const [stateList, setStateList] = useState();
    const [countryList, setCountryList] = useState();

    // state for dispaying modal 

    const CloseRef = useRef();

    async function LocationData() {
        const response = await axios({
            method: 'get',
            url: `/api/store/locations`,
        })
        setCityList(response.data.cities)
        setCountryList(response.data.countries)
        setStateList(response.data.states)
       
    }

    async function handleAddStoreSubmit(data, e) {

        try {

            const response = await axios({
                method: 'post',
                url: `/api/store`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: {
                    UserId: user.UserId,
                    StoreName: data.StoreName,
                    AddressLine1: data.AddressLine1,
                    AddressLine2: data.AddressLine2,
                    CountryId: data.Country,
                    StateId: data.State,
                    CityId: data.City,
                    PostalCode: data.PostalCode,
                    LocationLink: data.LocationLink,
                    Status: "active"
                }
            })
            dispatch({
                type: CONTEXT_TYPE.ADD_STORES,
                store: response.data.result[0]
            })
            Swal.fire({
                title: 'Success',
                text: "Store Added Successfully",
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            
            CloseRef.current.click()
            e.target.reset();
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: "Some Error Occure",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    }

    // for filter city and states
    const [ct, setCt] = useState();
    const [cs, setCs] = useState();
    const FilterState = (event) => {

        setCs(event.target.value);
    }

    const FilterCity = (event) => {

        setCt(event.target.value);
    }

    return (
        <div>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="bi bi-plus-lg"></i> Add Store
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" visible={1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Store</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='needs-validation' onSubmit={handleSubmit(handleAddStoreSubmit)} data-dismiss="modal">
                                <div>
                                    <label htmlFor="validationCustom03" className="form-label">Store Name*</label>
                                    <input className="form-control" type="text" placeholder="Store Name" {...register("StoreName", { required: true, min: 5, maxLength: 80 })} minLength={5} />
                                    <div className="text-danger">{errors.StoreName?.type === 'required' && <p role="alert">Store name is required</p>}</div>
                                </div>
                                <div>
                                    <label htmlFor="validationCustom04" className="form-label">Address Line 1*</label>
                                    <textarea className="form-control" {...register("AddressLine1", { required: true, maxLength: 100 })} />
                                    <div className="text-danger">{errors.AddressLine1?.type === 'required' && <p role="alert">Address is required</p>}</div>
                                </div>

                                <div>
                                    <label htmlFor="validationCustom04" className="form-label">Address Line 2</label>
                                    <textarea className="form-control" {...register("AddressLine2")} />
                                </div>
                                <div>
                                    <label htmlFor="validationCustom05" className="form-label">Postal Code*</label>
                                    <input type="number" className="form-control" placeholder="PostalCode" {...register("PostalCode", { required: true })} />
                                    <div className="text-danger">{errors.PostalCode?.type === 'required' && <p role="alert">Postal Code is required</p>}</div>
                                </div>
                                <div>
                                    <label htmlFor="validationCustom06" className="form-label">Locatio Link*</label>
                                    <input type="url" className="form-control" placeholder="Location Link" {...register("LocationLink", {
                                        required: true, pattern: MapLinkRegex.regex
                                    })} />
                                    <div className="text-danger">{errors.LocationLink?.type === 'required' && <p role="alert">Location Link is required</p>}</div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">Country*</label>
                                        <select className="form-control" {...register("Country", { required: true })} onClick={LocationData} onChange={FilterState} id='country-select'>
                                            {!countryList ? <option value={""}>Select Country</option> : countryList.map((item, index) => {
                                                return (<option value={item.countryId} key={index}>{item.countryName}</option>)
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.Country?.type === 'required' && <p role="alert">Country is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">State*</label>
                                        <select className="form-control" {...register("State", { required: true })} onChange={FilterCity} onClick={FilterCity}>
                                            {!cs ? "" : stateList.map((item, index) => {
                                                return (cs == item.countryId ? <option value={item.stateId} key={index}>{item.stateName}</option> : "")
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.State?.type === 'required' && <p role="alert">State is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">City*</label>
                                        <select className="form-control" {...register("City", { required: true })}>
                                            {!ct ? "" : cityList.map((item, index) => {
                                                return (ct == item.stateId ? <option value={item.cityId} key={index}>{item.cityName}</option> : "")
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.City?.type === 'required' && <p role="alert">City is required</p>}</div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal" ref={CloseRef} >Close</button>
                                <button className="btn btn-dark mt-3" type="submit">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal
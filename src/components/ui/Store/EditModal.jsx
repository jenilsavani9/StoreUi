import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

import { MapLinkRegex, BASE_URL } from '../../../constants/regex';
import Swal from 'sweetalert2';


function EditModal(props) {

    axios.defaults.baseURL = BASE_URL.URL;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [cityList, setCityList] = useState();
    const [stateList, setStateList] = useState();
    const [countryList, setCountryList] = useState();

    const CloseRef = useRef();

    async function LoadData() {
        const response = await axios({
            method: 'get',
            url: `/api/store/${props.value}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setValue('StoreName', response.data.result[0].storeName)
        setValue('AddressLine1', response.data.result[0].address)
        setValue('PostalCode', response.data.result[0].postalCode)
        setValue('LocationLink', response.data.result[0].locationLink)
    }

    async function LocationData() {
        const response = await axios({
            method: 'get',
            url: `/api/store/locations`,
        })
        setCityList(response.data.cities)
        setCountryList(response.data.countries)
        setStateList(response.data.states)
    }

    const handleEditStoreSubmit = async (data, e) => {
        try {
            const response = await axios({
                method: 'post',
                url: `/api/store/${props.value}`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: {
                    StoreId: props.value,
                    StoreName: data.StoreName,
                    Address: data.AddressLine1 + data.AddressLine2,
                    CountryId: data.Country,
                    StateId: data.State,
                    CityId: data.City,
                    PostalCode: data.PostalCode,
                    LocationLink: data.LocationLink,
                    Status: "active"
                }
            })
            Swal.fire({
                title: 'Success',
                text: "Store Updated Successfully",
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            CloseRef.current.click()
            e.target.reset();
            props.GetStore();
        } catch (error) {
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
            <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={LoadData}>
                Edit
            </button>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Store</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(handleEditStoreSubmit)}>
                                <div>
                                    <label htmlFor="validationCustom03" className="form-label">Store Name</label>
                                    <input className="form-control" type="text" placeholder="Store Name" {...register("StoreName", { required: true, min: 5, maxLength: 80 })} />
                                    <div className="text-danger">{errors.StoreName?.type === 'required' && <p role="alert">Store name is required</p>}</div>
                                </div>
                                <div>
                                    <label htmlFor="validationCustom04" className="form-label">Address Line 1</label>
                                    <textarea className="form-control" {...register("AddressLine1", { required: true, maxLength: 100 })} />
                                    <div className="text-danger">{errors.AddressLine1?.type === 'required' && <p role="alert">Address is required</p>}</div>

                                </div>

                                <div>
                                    <label htmlFor="validationCustom04" className="form-label">Address Line 2</label>
                                    <textarea className="form-control" {...register("AddressLine2")} />
                                </div>
                                <div>
                                    <label htmlFor="validationCustom05" className="form-label">Postal Code</label>
                                    <input type="number" className="form-control" placeholder="Postal Code" {...register("PostalCode", { required: true })} />
                                    <div className="text-danger">{errors.PostalCode?.type === 'required' && <p role="alert">Postal Code is required</p>}</div>

                                </div>
                                <div>
                                    <label htmlFor="validationCustom06" className="form-label">Locatio Link</label>
                                    <input type="url" className="form-control" placeholder="Location Link" {...register("LocationLink", {
                                        required: true, pattern: MapLinkRegex.regex
                                    })} />
                                    <div className="text-danger">{errors.LocationLink?.type === 'required' && <p role="alert">Location Link is required</p>}</div>

                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">Country</label>
                                        <select className="form-control" {...register("Country", { required: true })} onClick={LocationData} onChange={FilterState} id='country-select'>
                                            {!countryList ? <option value="">Select Country</option> : countryList.map((item, index) => {
                                                return (<option value={item.countryId} key={index}>{item.countryName}</option>)
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.Country?.type === 'required' && <p role="alert">Country is required</p>}</div>

                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">State</label>
                                        <select className="form-control" {...register("State", { required: true })} onChange={FilterCity} onClick={FilterCity}>
                                            {!cs ? "" : stateList.map((item, index) => {
                                                return (cs == item.countryId ? <option value={item.stateId} key={index}>{item.stateName}</option> : "")
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.State?.type === 'required' && <p role="alert">State is required</p>}</div>

                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">City</label>
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

export default EditModal
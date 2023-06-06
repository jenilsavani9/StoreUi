import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useStateValue } from '../../context/StateProvider';
import { useForm } from 'react-hook-form';
import StoreCard from '../../Components/Store/StoreCard';
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'bootstrap';

import { MapLinkRegex } from '../../constants/regex';
import Navbar from '../../Components/Navbar/Navbar'


function Store() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [{ user }, dispatch] = useStateValue();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState();

    const [stores, setStores] = useState();

    //dropdown list
    const [cityList, setCityList] = useState();
    const [stateList, setStateList] = useState();
    const [countryList, setCountryList] = useState();

    // state for dispaying modal 
    const [showModal, setShowModal] = useState(true);

    const CloseRef = useRef();

    async function GetStores() {
        try {
            const decoded = jwt_decode(token);
            await setUserId(decoded.UserId)
            SetUserInContext();
            const response = await axios({
                method: 'get',
                url: `https://localhost:44372/api/store?UserId=${decoded.UserId}`,
                headers: { Authorization: `Bearer ${token}` },
            })
            setStores(response.data.result)
        } catch (error) {
            console.log(error)
        }
    }

    async function SetUserInContext() {
        if (localStorage.getItem('token') != null) {
            dispatch({
                type: 'SET_USER',
                user: await jwt_decode(localStorage.getItem('token'))
            })
        }
    }

    useEffect(() => {

        GetStores();

    }, [token])

    async function LocationData() {
        const response = await axios({
            method: 'get',
            url: `https://localhost:44372/api/store/locations`,
        })
        setCityList(response.data.cities)
        setCountryList(response.data.countries)
        setStateList(response.data.states)
        dispatch({
            type: 'SET_CITIES',
            cities: response.data.cities
        }, {
            type: 'SET_STATES',
            states: response.data.states
        }, {
            type: 'SET_COUNTRY',
            country: response.data.country
        })
    }

    const hideModal = () => {
        $("#exampleModal").modal("hide");
    }

    async function handleAddStoreSubmit(data, e) {

        try {

            const response = await axios({
                method: 'post',
                url: `https://localhost:44372/api/store`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: {
                    UserId: user.UserId,
                    StoreName: data.storeName,
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
                text: "Store Added Successfully",
                icon: 'success',
                confirmButtonText: 'Cool'
            })

            CloseRef.current.click()
            e.target.reset();
            GetStores();
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
            <Navbar />
            <div className='container'>
                <div className="container">
                    <div className="d-flex justify-content-between mt-3">
                        <h2>Stores</h2>
                        {/* add Stores modal */}
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

                    </div>

                    <div className='mt-3'>
                        <div className="row">
                            {stores && stores.map((item, index) => {
                                return <StoreCard GetStores={GetStores} key={index} storesId={item.storeId} storeName={item.storeName} status={item.status} address={item.address} cityName={item.cityName} countryName={item.countryName} locationLink={item.locationLink} />
                            })}


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Store
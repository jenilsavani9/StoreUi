import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useStateValue } from '../../context/StateProvider';
import { useForm } from 'react-hook-form';
import StoreCard from '../../Components/Store/StoreCard';
import Swal from 'sweetalert2';


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
    }

    async function handleAddStoreSubmit(data, e) {
        console.log(data)
        try {
            const response = await axios({
                method: 'post',
                url: `https://localhost:44372/api/store`,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: {
                    UserId: user.UserId,
                    StoreName: data['Store Name'],
                    Address: data['Address Line 1'] + data['Address Line 2'],
                    CountryId: data['Country'],
                    StateId: data['State'],
                    CityId: data['City'],
                    PostalCode: data['Postal Code'],
                    LocationLink: data['Location Link'],
                    Status: "active"
                }
            })
            Swal.fire({
                title: 'Success',
                text: "Store Added Successfully",
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            e.target.reset();
            GetStores();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: "Some Error Occure",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }

    }

    // const [tempError, setTempError] = useState();

    function handleErrorAddStoreSubmit(errors) {

        // if(errors["Address Line 1"]) {
        //     setTempError(tempError + "Address Line 1 Is not valid.")
        // }
        Swal.fire({
            title: 'Error!',
            text: "Enter Valid information",
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        // setTempError("")
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

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Store</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit(handleAddStoreSubmit, handleErrorAddStoreSubmit)}>
                                                <div>
                                                    <label htmlFor="validationCustom03" className="form-label">Store Name</label>
                                                    <input className="form-control" type="text" placeholder="Store Name" {...register("Store Name", { required: true, min: 5, maxLength: 80 })} />
                                                </div>
                                                <div>
                                                    <label htmlFor="validationCustom04" className="form-label">Address Line 1</label>
                                                    <textarea className="form-control" {...register("Address Line 1", { required: true, maxLength: 100 })} />
                                                </div>

                                                <div>
                                                    <label htmlFor="validationCustom04" className="form-label">Address Line 2</label>
                                                    <textarea className="form-control" {...register("Address Line 2")} />
                                                </div>
                                                <div>
                                                    <label htmlFor="validationCustom05" className="form-label">Postal Code</label>
                                                    <input type="number" className="form-control" placeholder="Postal Code" {...register("Postal Code", { required: true })} />
                                                </div>
                                                <div>
                                                    <label htmlFor="validationCustom06" className="form-label">Locatio Link</label>
                                                    <input type="url" className="form-control" placeholder="Location Link" {...register("Location Link", {
                                                        required: true, pattern: /https:\/\/goo\.gl\/maps\//i
                                                    })} />
                                                </div>

                                                <div className="row">
                                                    <div className="col-4">
                                                        <label htmlFor="validationCustom06" className="form-label">Country</label>
                                                        <select className="form-control" {...register("Country")} onClick={LocationData}>
                                                            {!countryList ? <option>Select Country</option> : countryList.map((item, index) => {
                                                                return (<option value={item.countryId} key={index}>{item.countryName}</option>)
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="col-4">
                                                        <label htmlFor="validationCustom06" className="form-label">State</label>
                                                        <select className="form-control" {...register("State")}>
                                                            {!stateList ? "" : stateList.map((item, index) => {
                                                                return (<option value={item.stateId} key={index}>{item.stateName}</option>)
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="col-4">
                                                        <label htmlFor="validationCustom06" className="form-label">City</label>
                                                        <select className="form-control" {...register("City")}>
                                                            {!cityList ? "" : cityList.map((item, index) => {
                                                                return (<option value={item.cityId} key={index}>{item.cityName}</option>)
                                                            })}
                                                        </select>
                                                    </div>

                                                </div>
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
                                return <StoreCard key={index} storesId={item.storesId} storeName={item.storeName} status={item.status} address={item.address} cityName={item.cityName} countryName={item.countryName} locationLink={item.locationLink} />
                            })}


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Store
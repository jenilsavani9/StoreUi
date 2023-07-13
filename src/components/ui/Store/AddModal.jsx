import 'bootstrap';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CONTEXT_TYPE, TOAST_CONSTANT } from '../../../constants/constant';
import { MapLinkRegex } from '../../../constants/regex';
import { useStateValue } from '../../../contexts/StateProvider';
import { AddStoreService, StoreCityService, StoreCountryService, StoreStateService } from '../../../services/Store';

function AddModal() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ {  }, dispatch] = useStateValue();

    //dropdown list
    const [cityList, setCityList] = useState();
    const [stateList, setStateList] = useState();
    const [countryList, setCountryList] = useState();

    const CloseRef = useRef();

    async function LocationData() {
        const response = await StoreCountryService();
        // setCityList(response.data.locations.cities)
        setCountryList(response.data.locations.countries)
        // setStateList(response.data.locations.states)
    }

    async function handleAddStoreSubmit(data, e) {

        try {
            const UserId = localStorage.getItem('UserId');
            const response = await AddStoreService(data, UserId)
            dispatch({
                type: CONTEXT_TYPE.ADD_STORES,
                store: response.data.payload[0]
            })
            toast.success('🦄 Stores Added Successfully!', {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
            CloseRef.current.click()
            e.target.reset();
        } catch (error) {
            console.log(error)
            toast.error('🦄 some error Occurred!', {
                position: TOAST_CONSTANT.position,
                autoClose: TOAST_CONSTANT.autoClose,
                theme: TOAST_CONSTANT.theme,
            });
        }
    }

    const FilterState = async (event) => {
        // setCs(event.target.value);
        const response = await StoreStateService(event.target.value);
        setStateList(response.data.locations.states)
    }

    const FilterCity = async (event) => {
        // setCt(event.target.value);
        const response = await StoreCityService(event.target.value);
        setCityList(response.data.locations.cities)
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

                                {/* <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">Country*</label>
                                        <select className="form-control" {...register("Country", { required: true })} onClick={LocationData} onChange={FilterState} id='country-select'>
                                            {!countryList ? <option value={""}>Select Country</option> : countryList.map((item, index) => {
                                                return (<option value={item.Id} key={index}>{item.Name}</option>)
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.Country?.type === 'required' && <p role="alert">Country is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">State*</label>
                                        <select className="form-control" {...register("State", { required: true })} onChange={FilterCity} onClick={FilterCity}>
                                            {!cs ? "" : stateList.map((item, index) => {
                                                return (cs == item.CountryId ? <option value={item.Id} key={index}>{item.Name}</option> : "")
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.State?.type === 'required' && <p role="alert">State is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">City*</label>
                                        <select className="form-control" {...register("City", { required: true })}>
                                            {!ct ? "" : cityList.map((item, index) => {
                                                return (ct == item.StateId ? <option value={item.Id} key={index}>{item.Name}</option> : "")
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.City?.type === 'required' && <p role="alert">City is required</p>}</div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">Country*</label>
                                        <select className="form-control" {...register("Country", { required: true })} onClick={LocationData} onChange={FilterState} id='country-select'>
                                            {!countryList ? <option value={""}>Select Country</option> : countryList.map((item, index) => {
                                                return (<option value={item.Id} key={index}>{item.Name}</option>)
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.Country?.type === 'required' && <p role="alert">Country is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">State*</label>
                                        <select className="form-control" {...register("State", { required: true })} onChange={FilterCity}>
                                            {!stateList ? <option value={""}>Select State</option> : stateList.map((item, index) => {
                                                return (<option value={item.Id} key={index}>{item.Name}</option>)
                                            })}
                                        </select>
                                        <div className="text-danger">{errors.State?.type === 'required' && <p role="alert">State is required</p>}</div>
                                    </div>

                                    <div className="col-4">
                                        <label htmlFor="validationCustom06" className="form-label">City*</label>
                                        <select className="form-control" {...register("City", { required: true })} placeholder='select city'>
                                            {!cityList ? <option value={""}>Select City</option> : cityList.map((item, index) => {
                                                return (<option value={item.Id} key={index}>{item.Name}</option>)
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
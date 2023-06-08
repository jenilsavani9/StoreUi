import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap';

import StoreCard from '../components/ui/Store/StoreCard';
import { useStateValue } from '../contexts/StateProvider';
import AddModal from '../components/ui/Store/AddModal';
import { CONTEXT_TYPE } from '../constants/constant';


function Store() {

    const [{ stores }, dispatch] = useStateValue();
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [tempStores, setTempStores] = useState([]);

    async function GetStores() {
        try {
            const decoded = jwt_decode(token);
            SetUserInContext();
            const response = await axios({
                method: 'get',
                url: `https://localhost:44372/api/store?UserId=${decoded.UserId}`,
                headers: { Authorization: `Bearer ${token}` },
            })
            response.data.result.map(item => setTempStores(tempStores.push(item)))
            dispatch({
                type: CONTEXT_TYPE.SET_STORES,
                stores: tempStores
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function SetUserInContext() {
        if (localStorage.getItem('token') != null) {
            dispatch({
                type: CONTEXT_TYPE.SET_USER,
                user: await jwt_decode(localStorage.getItem('token'))
            })
        }
    }

    useEffect(() => {

        GetStores();

    }, [])


    return (
        <div>
            <div className='container'>
                <div className="container">
                    <div className="d-flex justify-content-between mt-3">
                        <h2>Stores</h2>
                        <AddModal />
                    </div>

                    <div className='mt-3'>
                        <div className="row">
                            {stores.length > 0 ? stores?.map((item, index) => {
                                return <StoreCard GetStores={GetStores} key={index} storesId={item.storeId} storeName={item.storeName} status={item.status} address={item.address} cityName={item.cityName} countryName={item.countryName} locationLink={item.locationLink} />
                            }) : <div>No Store Found</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Store
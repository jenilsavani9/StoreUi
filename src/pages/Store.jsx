import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap';

import StoreCard from '../components/ui/Store/StoreCard';
import { useStateValue } from '../contexts/StateProvider';
import AddModal from '../components/ui/Store/AddModal';
import { CONTEXT_TYPE } from '../constants/constant';
import { LoadFeature } from '../services/Features';
import Spinner from '../components/ui/Ui/Spinner';
import FileUpload from '../components/ui/Ui/FileUpload';


function Store() {

    const [{ stores }, dispatch] = useStateValue();
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [tempStores, setTempStores] = useState([]);

    async function GetStores() {
        try {
          const decoded = jwt_decode(token);
          const response = await axios({
            method: 'get',
            url: `/api/store?UserId=${decoded.UserId}`,
            headers: { Authorization: `Bearer ${token}` },
          });
      
          const storesData = response.data.result.map(async item => {
            const StoreFeature = await axios({
              method: 'get',
              url: `/api/StoreFeature/Store?StoreId=${item.storeId}`,
              headers: { Authorization: `Bearer ${token}` },
            });
            item['StoreFeature'] = StoreFeature.data.result;
            return item;
          });
      
          const updatedStores = await Promise.all(storesData);
      
          dispatch({
            type: CONTEXT_TYPE.SET_STORES,
            stores: updatedStores
          });
        } catch (error) {
          console.log(error);
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
                        <h2>Stores <FileUpload /></h2>
                        <AddModal />
                    </div>

                    <div className='mt-3'>
                        <div className="row">
                            {stores.length > 0 ? stores?.map((item, index) => {
                                return <StoreCard 
                                key={index} 
                                storesId={item.storeId} 
                                storeName={item.storeName} 
                                status={item.status} 
                                addressLine1={item.addressLine1} 
                                addressLine2={item.addressLine2}
                                cityName={item.cityName} 
                                countryName={item.countryName} 
                                locationLink={item.locationLink}
                                StoreFeature={item.StoreFeature} />
                            }) : <div className='text-center'>No Store Found</div> }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Store
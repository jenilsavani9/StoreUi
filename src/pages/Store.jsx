import 'bootstrap';
import React, { useEffect, useState } from 'react';

import AddModal from '../components/ui/Store/AddModal';
import StoreCard from '../components/ui/Store/StoreCard';
import FileUpload from '../components/ui/Ui/FileUpload';
import { CONTEXT_TYPE } from '../constants/constant';
import { useStateValue } from '../contexts/StateProvider';
import { GetStoresByUserId } from '../services/Store';


function Store() {

  const [{ stores }, dispatch] = useStateValue();
  const [token, setToken] = useState(localStorage.getItem('token'));

  async function GetStores() {
    try {
      const UserId = localStorage.getItem('UserId')
      const response = await GetStoresByUserId(UserId, token);
      dispatch({
        type: CONTEXT_TYPE.SET_STORES,
        stores: response.data.payload
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
                  storesId={item.id}
                  storeName={item.name}
                  status={item.status}
                  addressLine1={item.address.addressLine1}
                  addressLine2={item.address.addressLine2}
                  cityName={item.city.name}
                  countryName={item.country.name}
                  locationLink={item.address.locationLink}
                  StoreFeature={item.features} />
              }) : <div className='text-center'>No Store Found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Store
import React, {useState} from 'react'
import Paypal from './Paypal';


function Payment() {
const [checkout, setCheckout] = useState(false);
    return (
        <div className="payment">

            {checkout ? (
                <Paypal/>
            ) : (
            <div style={styleObject} onClick={()=>{setCheckout(true)}}>Book Hotel</div>
            )}
        </div>

    );
}
const styleObject = {
    fontSize: '15px',
    fontWeight: '700',
    color: 'white',
    margintop: '150px',
}
export default Payment;
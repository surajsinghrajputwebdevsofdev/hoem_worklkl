import React from 'react'
import Navbar from '../../component/Navbar'
import "./Paymentpage.css";

function Paymentpage() {
    return (
        <>
            <Navbar />
            <div className='p-4'>
                <div className="container shadow ">
                    <div className='cart' >
                        <div class="title">
                            <h2 className='text-black'>Payment method </h2>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputFirstName" >First Name </label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="First Name" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputLastName">Last Name</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="Last Name" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">Street Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="House number and street name" />
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Town / City </label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Town / City " />
                        </div>

                        <div class="form-group">
                            <label for="inputAddress2">State / County </label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="State / County" />
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Postcode / ZIP  </label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Postcode / ZIP " />
                        </div>

                        <div class="form-group">
                            <label for="inputphone">Phone </label>
                            <input type="tel" class="form-control" id="inputAddress2" placeholder="Phone" />
                        </div>

                        <div class="form-group">
                            <label for="inputemail">Email Address  </label>
                            <input type="email" class="form-control" id="inputAddress2" placeholder="Email Address " />
                        </div>

                        <button type="submit" class="btn btn-secondary text-bg-dark"> Cash on Delivery</button>
                        <button type="submit" class="btn btn-secondary text-bg-info p-2 m-3 "> Pay online</button>
                    </div>
                    <h1 className='text-black'>
                        Total Amount :00
                    </h1>
                </div>
            </div>
        </>
    )
}

export default Paymentpage
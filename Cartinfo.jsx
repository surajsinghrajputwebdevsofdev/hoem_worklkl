import React from 'react'
import Navbar from '../../component/Navbar'
import "./Cartinfo.css";
import { Link, useParams } from "react-router-dom";

function Cartinfo() {
    const { id } = useParams();
    // useEffect(() => {
    //     if (id) {
    //       fetchcartinfobylogineduser(id);
    //     }
    //   }, [id]);
    //   const fetchcartinfobylogineduser = async (userId) => {
    //     axiosInstance.get(`/productbycatid/${userId}`).then((d) => {
    //       setCategory(d.data.products);
    //     });
    //   };
    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                    </svg>
                    <p hidden>hello</p>  Your Shopping Cart</h1>

                <div className="shopping-cart">

                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Quantity</label>
                        <label className="product-removal">Remove</label>
                        <label className="product-line-price">Total</label>
                    </div>

                    <div className="product">
                        <div className="product-image">  <input type="checkbox" className="checkbox m-4" />

                            <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
                        </div>
                        <div className="product-details">
                            <div className="product-title text-black">Dingo Dog Bones</div>
                            <p className="product-description text-black">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
                        </div>
                        <div className="product-price text-black">12.99</div>
                        <div className="product-quantity">
                            <input type="number" value="2" min="1" />
                        </div>
                        <div className="product-removal">
                            <button className="remove-product">
                                Remove
                            </button>
                        </div>
                        <div className="product-line-price text-black">25.98</div>
                    </div>

                    <div className="product">
                        <div className="product-image">
                            <input type="checkbox" className="checkbox m-4" />
                            <img src="https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png" />
                        </div>
                        <div className="product-details">
                            <div className="product-title text-black">Nutro™ Adult Lamb and Rice Dog Food</div>
                            <p className="product-description text-black">Who doesn't like lamb and rice? We've all hit the halal cart at 3am while quasi-blackout after a night of binge drinking in Manhattan. Now it's your dog's turn!</p>
                        </div>
                        <div className="product-price text-black">45.99</div>
                        <div className="product-quantity">
                            <input type="number" value="1" min="1" />
                        </div>
                        <div className="product-removal">
                            <button className="remove-product">
                                Remove
                            </button>
                        </div>
                        <div className="product-line-price text-black">45.99</div>
                    </div>

                    <div className="totals">
                        <div className="totals-item text-black">
                            <label>Subtotal</label>
                            <div className="totals-value text-black" id="cart-subtotal">71.97</div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Tax (5%)</label>
                            <div className="totals-value text-black" id="cart-tax">3.60</div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Shipping</label>
                            <div className="totals-value text-black" id="cart-shipping">15.00</div>
                        </div>
                        <div className="totals-item totals-item-total text-black">
                            <label>Grand Total</label>
                            <div className="totals-value text-black" id="cart-total">90.57</div>
                        </div>
                    </div>
                    <Link to="/paymentpage">

                        <button className="checkout">Checkout</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Cartinfo
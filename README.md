import CartModel from "../models/Cart.js";
import ProductModel from "../models/Product.js";
import VariantModel from "../models/Variant.js";

export const getCart = async (req, res) => {
    try {
        const { UserId } = req.params;  // Assuming UserId is passed as a URL parameter
        const cartItems = await CartModel.find({ user_id: UserId })
            .populate('product_id')
            .populate('variant_id');

        if (cartItems.length > 0) {
            return res.status(200).send(cartItems);
        } else {
            return res.status(404).send({ message: "No items found in the cart for this user" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e?.message });
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const deletedItem = await CartModel.findByIdAndDelete(cartItemId);

        if (deletedItem) {
            return res.status(200).send({ message: "Item removed from cart successfully" });
        } else {
            return res.status(404).send({ message: "Item not found in cart" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e?.message });
    }
};


export const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).send({ message: "Quantity must be at least 1" });
        }

        const updatedItem = await CartModel.findByIdAndUpdate(cartItemId, { quantity }, { new: true });

        if (updatedItem) {
            return res.status(200).send({ message: "Item quantity updated successfully", item: updatedItem });
        } else {
            return res.status(404).send({ message: "Item not found in cart" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e?.message });
    }
};


router.put('/cart/:cartItemId', updateCartItemQuantity);

router.delete('/cart/:cartItemId', deleteCartItem);


import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "./Cartinfo.css";

function Cartinfo() {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchCartInfoByLoggedInUser(id);
        }
    }, [id]);

    const fetchCartInfoByLoggedInUser = async (userId) => {
        try {
            const response = await axios.get(`/cart/${userId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeCartItem = async (cartItemId) => {
        try {
            await axios.delete(`/cart/${cartItemId}`);
            setCartItems(cartItems.filter(item => item._id !== cartItemId));
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const updateCartItemQuantity = async (cartItemId, quantity) => {
        try {
            const response = await axios.put(`/cart/${cartItemId}`, { quantity });
            const updatedItem = response.data.item;
            setCartItems(cartItems.map(item => item._id === cartItemId ? updatedItem : item));
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-basket2" viewBox="0 0 16 16">
                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                    </svg>
                    <p hidden>hello</p> Your Shopping Cart</h1>

                <div className="shopping-cart">
                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Quantity</label>
                        <label className="product-removal">Remove</label>
                        <label className="product-line-price">Total</label>
                    </div>

                    {cartItems.map((item, index) => (
                        <div className="product" key={index}>
                            <div className="product-image">
                                <input type="checkbox" className="checkbox m-4" />
                                <img src={item.product_id.imageUrl} alt={item.product_id.name} />
                            </div>
                            <div className="product-details">
                                <div className="product-title text-black">{item.product_id.name}</div>
                                <p className="product-description text-black">{item.product_id.description}</p>
                            </div>
                            <div className="product-price text-black">{item.price}</div>
                            <div className="product-quantity">
                                <button onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}>-</button>
                                <input type="number" value={item.quantity} min="1" readOnly />
                                <button onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="product-removal">
                                <button className="remove-product" onClick={() => removeCartItem(item._id)}>
                                    Remove
                                </button>
                            </div>
                            <div className="product-line-price text-black">{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}

                    <div className="totals">
                        <div className="totals-item text-black">
                            <label>Subtotal</label>
                            <div className="totals-value text-black" id="cart-subtotal">
                                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                            </div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Tax (5%)</label>
                            <div className="totals-value text-black" id="cart-tax">
                                {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.05).toFixed(2)}
                            </div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Shipping</label>
                            <div className="totals-value text-black" id="cart-shipping">15.00</div>
                        </div>
                        <div className="totals-item totals-item-total text-black">
                            <label>Grand Total</label>
                            <div className="totals-value text-black" id="cart-total">
                                {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.05 + 15).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <Link to="/paymentpage">
                        <button className="checkout">Checkout</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Cartinfo;



import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Cartinfo.css";

function Cartinfo() {
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchCartInfoByLoggedInUser(id);
        }
    }, [id]);

    const fetchCartInfoByLoggedInUser = async (userId) => {
        try {
            const response = await axios.get(`/cart/${userId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeCartItem = async (cartItemId) => {
        try {
            await axios.delete(`/cart/${cartItemId}`);
            setCartItems(cartItems.filter(item => item._id !== cartItemId));
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const updateCartItemQuantity = async (cartItemId, quantity) => {
        try {
            const response = await axios.put(`/cart/${cartItemId}`, { quantity });
            const updatedItem = response.data.item;
            setCartItems(cartItems.map(item => item._id === cartItemId ? updatedItem : item));
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleCheckout = () => {
        const selectedTotal = selectedItems.reduce((total, itemId) => {
            const item = cartItems.find(item => item._id === itemId);
            return total + item.price * item.quantity;
        }, 0);
        navigate('/paymentpage', { state: { selectedTotal } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-basket2" viewBox="0 0 16 16">
                        <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                    </svg>
                    <p hidden>hello</p> Your Shopping Cart</h1>

                <div className="shopping-cart">
                    <div className="column-labels">
                        <label className="product-image">Image</label>
                        <label className="product-details">Product</label>
                        <label className="product-price">Price</label>
                        <label className="product-quantity">Quantity</label>
                        <label className="product-removal">Remove</label>
                        <label className="product-line-price">Total</label>
                    </div>

                    {cartItems.map((item, index) => (
                        <div className="product" key={index}>
                            <div className="product-image">
                                <input
                                    type="checkbox"
                                    className="checkbox m-4"
                                    checked={selectedItems.includes(item._id)}
                                    onChange={() => handleSelectItem(item._id)}
                                />
                                <img src={item.product_id.imageUrl} alt={item.product_id.name} />
                            </div>
                            <div className="product-details">
                                <div className="product-title text-black">{item.product_id.name}</div>
                                <p className="product-description text-black">{item.product_id.description}</p>
                            </div>
                            <div className="product-price text-black">{item.price}</div>
                            <div className="product-quantity">
                                <button onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}>-</button>
                                <input type="number" value={item.quantity} min="1" readOnly />
                                <button onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="product-removal">
                                <button className="remove-product" onClick={() => removeCartItem(item._id)}>
                                    Remove
                                </button>
                            </div>
                            <div className="product-line-price text-black">{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}

                    <div className="totals">
                        <div className="totals-item text-black">
                            <label>Subtotal</label>
                            <div className="totals-value text-black" id="cart-subtotal">
                                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                            </div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Tax (5%)</label>
                            <div className="totals-value text-black" id="cart-tax">
                                {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.05).toFixed(2)}
                            </div>
                        </div>
                        <div className="totals-item text-black">
                            <label>Shipping</label>
                            <div className="totals-value text-black" id="cart-shipping">15.00</div>
                        </div>
                        <div className="totals-item totals-item-total text-black">
                            <label>Grand Total</label>
                            <div className="totals-value text-black" id="cart-total">
                                {(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 1.05 + 15).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <button className="checkout" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </>
    );
}

export default Cartinfo;



import React from 'react';
import Navbar from '../../component/Navbar';
import { useLocation } from 'react-router-dom';
import "./Paymentpage.css";

function Paymentpage() {
    const location = useLocation();
    const { selectedTotal } = location.state;

    return (
        <>
            <Navbar />
            <div className='p-4'>
                <div className="container shadow ">
                    <div className='cart'>
                        <div className="title">
                            <h2 className='text-black'>Payment method</h2>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputFirstName">First Name</label>
                                <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputLastName">Last Name</label>
                                <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Street Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="House number and street name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputCity">Town / City</label>
                            <input type="text" className="form-control" id="inputCity" placeholder="Town / City" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputState">State / County</label>
                            <input type="text" className="form-control" id="inputState" placeholder="State / County" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputZip">Postcode / ZIP</label>
                            <input type="text" className="form-control" id="inputZip" placeholder="Postcode / ZIP" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPhone">Phone</label>
                            <input type="tel" className="form-control" id="inputPhone" placeholder="Phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email Address" />
                        </div>

                        <button type="submit" className="btn btn-secondary text-bg-dark">Cash on Delivery</button>
                        <button type="submit" className="btn btn-secondary text-bg-info p-2 m-3">Pay online</button>
                    </div>
                    <h1 className='text-black'>
                        Total Amount: ${selectedTotal.toFixed(2)}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Paymentpage;


// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;


// controllers/orderController.js
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).send({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send({ error: error.message });
    }
};


import React, { useState } from 'react';
import Navbar from '../../component/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Paymentpage.css";

function Paymentpage() {
    const location = useLocation();
    const { selectedTotal } = location.state;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            ...formData,
            totalAmount: selectedTotal,
            paymentStatus: 'Pending'
        };

        try {
            await axios.post('/api/orders', orderData);
            navigate('/order-success');
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='p-4'>
                <div className="container shadow ">
                    <div className='cart'>
                        <div className="title">
                            <h2 className='text-black'>Payment method</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputFirstName">First Name</label>
                                    <input type="text" className="form-control" id="inputFirstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputLastName">Last Name</label>
                                    <input type="text" className="form-control" id="inputLastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Street Address</label>
                                <input type="text" className="form-control" id="inputAddress" name="address" placeholder="House number and street name" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCity">Town / City</label>
                                <input type="text" className="form-control" id="inputCity" name="city" placeholder="Town / City" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputState">State / County</label>
                                <input type="text" className="form-control" id="inputState" name="state" placeholder="State / County" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputZip">Postcode / ZIP</label>
                                <input type="text" className="form-control" id="inputZip" name="zip" placeholder="Postcode / ZIP" value={formData.zip} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPhone">Phone</label>
                                <input type="tel" className="form-control" id="inputPhone" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email Address</label>
                                <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-secondary text-bg-dark">Cash on Delivery</button>
                        </form>
                    </div>
                    <h1 className='text-black'>
                        Total Amount: ${selectedTotal.toFixed(2)}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Paymentpage;

router.post('/orders', createOrder);


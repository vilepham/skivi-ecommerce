import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-btn/CustomButton';
import CartItem from '../cart-item/CartItem';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCartItemsQuantity } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './CartDropdown.scss';

const CartDropdown = ({ cartItems, itemCount, history, dispatch }) => (
    <div className='cart-dropdown'>
    <h3>My Cart { itemCount > 1 ? (<span>{itemCount} items</span>) : (<span>{itemCount} item</span>)}</h3>
    {
        cartItems.length ?
        (<div>
            <div className='cart-items'>
                {cartItems.map(cartItem => 
                (<CartItem key={cartItem.id} item={cartItem} />)
                )}
            </div>
            <CustomButton className='checkout-btn' 
                onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden())}}> GO TO CHECKOUT </CustomButton>
        </div>
        )
        : (<div>
            <div className='empty-message'>Your cart is empty</div>
            <CustomButton className='shop-btn' 
                onClick={() => {
                    history.push('/shop');
                    dispatch(toggleCartHidden())}}> SHOP NOW </CustomButton>
        </div>)
    }
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsQuantity
})

export default withRouter(connect(mapStateToProps)(CartDropdown));
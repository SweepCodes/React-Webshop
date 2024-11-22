import React from "react";
import {ShoppingCartItem} from "../types";
import "./ShoppingCart.css";

interface ShoppingCartProps {
    items: ShoppingCartItem[];
    onRemove: (id: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({items, onRemove}) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="shopping-cart">
            <h5 className="cart-title">Shopping Cart</h5>
            <ul className="cart-list">
                {items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div className="cart-item-details">
                            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h6>{item.title}</h6>
                                <p>Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <div className="cart-item-actions">
                            <p className="cart-item-price">{item.price} $</p>
                            <button className="btn-remove" onClick={() => onRemove(item.id)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <h6 className="cart-total">Total: {total.toFixed(2)} $</h6>
        </div>
    );
};

import React from "react";
import {Product} from "../types";
import "./ProductList.css";

interface ProductListProps {
    products: Product[];
    onAddToShoppingCart: (product: Product) => void;
    onShowDetails: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({products, onAddToShoppingCart, onShowDetails}) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                    <div className="product-details">
                        <h5 className="product-title">{product.title}</h5>
                        <p className="product-price">{product.price} $</p>
                        <div className="product-actions">
                            <button className="btn btn-primary" onClick={() => onAddToShoppingCart(product)}>
                                Add to Cart
                            </button>
                            <button className="btn btn-secondary" onClick={() => onShowDetails(product)}>
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

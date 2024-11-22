/*  WebShop React App 
    En Webbshop utvecklad med hjälp av react och DummyJson API där användare kan söka på produkter och lägga till i sin varukorg
    Utvecklad av Abdulla Jamal
    Senast Ändrad: 22-11-2024

*/

import React, {useEffect, useState} from "react";
import {Product, ShoppingCartItem} from "./types";
import {SearchBar} from "./components/Searchbar";
import {ProductList} from "./components/ProductList";
import {ShoppingCart} from "./components/ShoppingCart";
import Modal from "react-modal";
import "./App.css";

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setProducts([]);
            return;
        }

        setIsLoading(true);
        fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch products:", err);
                setIsLoading(false);
            });
    }, [searchQuery]);

    const handleAddToShoppingCart = (product: Product) => {
        setShoppingCart((prevShoppingCart) => {
            const existingItem = prevShoppingCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevShoppingCart.map((item) => (item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
            } else {
                return [...prevShoppingCart, {...product, quantity: 1}];
            }
        });
    };

    const handleRemoveFromShoppingCart = (id: number) => {
        setShoppingCart((prevShoppingCart) => prevShoppingCart.filter((item) => item.id !== id));
    };

    return (
        <div className="app-container">
            <div className="search-bar-container">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            <div className="product-list-container">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : products.length > 0 ? (
                    <ProductList products={products} onAddToShoppingCart={handleAddToShoppingCart} onShowDetails={setSelectedProduct} />
                ) : (
                    searchQuery && <p>No products found for "{searchQuery}".</p>
                )}
            </div>
            <ShoppingCart items={shoppingCart} onRemove={handleRemoveFromShoppingCart} />
            <Modal isOpen={!!selectedProduct} onRequestClose={() => setSelectedProduct(null)} className="custom-modal" overlayClassName="custom-overlay">
                {selectedProduct && (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>{selectedProduct.title}</h5>
                        </div>
                        <div className="modal-body">
                            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                            <p>{selectedProduct.description}</p>
                            <p className="price"> pris: {selectedProduct.price} SEK</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setSelectedProduct(null)}>Close</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default App;

import { useState, useEffect, useRef } from 'react';
import * as productsAPI from '../../utilities/products-api';
import * as ordersAPI from '../../utilities/orders-api';
import './ShopPage.css';
import ProductList from '../../components/ProductList/ProductList';
import CategoryList from '../../components/CategoryList/CategoryList';
import { useContext } from 'react';
import { CartContext } from '../App/App';

export default function ShopPage({ setCart }) {
    const [products, setProducts] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const categoriesRef = useRef([]);
    const cart = useContext(CartContext);

    useEffect(function () {
        async function getProducts() {
            const products = await productsAPI.getAll();
            const catList = products.map(product => product.categories).flat()
            categoriesRef.current = ['All Plants', ...new Set(catList.map(cat => cat.name))];
            setProducts(products);
            setActiveCat(categoriesRef.current[0])
        }
        getProducts();
    }, []);

    /*-- Event Handlers --*/
    async function handleAddToOrder(productId) {
        const updatedCart = await ordersAPI.addProductToCart(productId, cart._id);
        // console.log(`LALALAL`)
        // console.log(updatedCart)
        setCart(updatedCart);
    }

    return (
        <div className="ShopPage">
            <h1>Shop Page</h1>
            <div className="ShopArea">
                <aside>
                    {/* <h3>Categories</h3> */}
                    <CategoryList
                        categories={categoriesRef.current}
                        activeCat={activeCat}
                        setActiveCat={setActiveCat}
                    />
                </aside>
                <div>
                    {/* <h3>Product List</h3> */}
                    <ProductList
                        products={activeCat === 'All Plants' ? products : products.filter(product => product.categories.some(category => category.name === activeCat))}
                        handleAddToOrder={handleAddToOrder}
                    />
                </div>
            </div>
        </div >
    );
}
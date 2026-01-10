import './App.css'
import { useState, useContext, createContext, useEffect, memo, useCallback } from 'react'
import getProductList from './api/productAPI';


const LayoutContext = createContext('mobile');
const CartContext = createContext(null);

function getLayout(width) {
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
}

function useLayout() {
  const [layout, setLayout] = useState(() => getLayout(window.innerWidth));

  useEffect(() => {
    function handleResize() {
      setLayout(getLayout(window.innerWidth));
    }

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return layout;
}

function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProductList()
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);

  const handleQuantityChange = useCallback((name, quantity) => {
    setProducts(prevProducts => prevProducts.map((product) => {
      if (product.name === name) {
        return {
          ...product,
          quantity: quantity,
        }
      }
      return product;
    }))
  }, []);

  const cartItems = products.filter((product) => product.quantity > 0);

  return (
    <CartContext.Provider value={{ products, handleQuantityChange, cartItems }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

function AddToCartButton({ setActivated, isActivated, quantity, onQuantityChange }) {
  const handleClickMainButton = () => {
    setActivated(true);
    onQuantityChange(1);
  }
  const handleClickDecreaseButton = () => {
    onQuantityChange(quantity - 1);
    if (quantity === 1) {
      setActivated(false);
    }
  }
  const handleClickIncreaseButton = () => {
    onQuantityChange(quantity + 1);
  }
  if (isActivated) {
    return (
      <div className='add-to-cart-activated'>
        <button className='decrease-quantity-btn' onClick={handleClickDecreaseButton}>
          <div className='decrease-quantity-btn-img'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5ZM10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25Z" fill="white"/>
              <path d="M5 9.375H15V10.625H5V9.375Z" fill="white"/>
            </svg>
          </div> 
        </button>
        <span>{ quantity }</span>
        <button className='increase-quantity-btn' onClick={handleClickIncreaseButton}>
          <div className='increase-quantity-btn-img'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5ZM10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25Z" fill="white"/>
              <path d="M15 9.375H10.625V5H9.375V9.375H5V10.625H9.375V15H10.625V10.625H15V9.375Z" fill="white"/>
            </svg>
          </div> 
        </button>
      </div>
    )
  }
  return (
    <button className={'add-to-cart-btn'} onClick={handleClickMainButton}>
      <img src="./assets/images/icon-add-to-cart.svg" alt="" />
      <span>Add to Cart</span>
    </button>
  )
}

const ProductCard = memo(function ProductCard({ product, onQuantityChange }) {
  console.log('Rendering:', product.name);

  const [isActivated, setActivated] = useState(false);
  const layout = useContext(LayoutContext);

  return (
    <div className='product-card'>
      <div className={isActivated ? 'item-display-content activate' : 'item-display-content'}>
        <img src={product.image[layout]} alt={product.name + " " + layout}/>
        <AddToCartButton 
          isActivated={isActivated} 
          setActivated={setActivated} 
          quantity={product.quantity ?? 0} 
          onQuantityChange={(quantity) => onQuantityChange(product.name, quantity)}
        />
      </div>
      <div className="item-info">
        <h1>{product.name}</h1>
        <p className='description'>{product.category}</p>
        <p className='price'>${product.price}</p>
      </div>
    </div>
  )
});

function ProductList() {
  const { products, handleQuantityChange } = useCart();
  
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard key={product.name} product={product} onQuantityChange={handleQuantityChange}/>
      ))}
    </div>
  )
}

function ProductContainer() {
  return (
    <div className='product-container'>
      <h1>Desserts</h1>
      <ProductList/>
    </div>
  )
}

function CartListItem() {}

function CartList({ quantity }){
  if (quantity === 0) {
    return (
    <div className='cart-empty-placeholder'>
      <img src="./assets/images/illustration-empty-cart.svg" alt="" />
      <p>Your added items will appear here</p>
    </div>
    )
  }
  return (
    <div className='cart-list'>
      
    </div>
  )
}

function Cart(){
  const {cartItems} = useCart();
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className='cart'>
      <h1>your cart ({quantity})</h1>
      <CartList quantity={quantity}/>
    </div>
  )
}

function CartContainer() {
  return (
    <div className='cart-container'>
      <Cart/>
    </div>
  )
}

function App() {
  const layout = useLayout();
  
  return (
    <LayoutContext.Provider value={layout}>
      <CartProvider>
        <main className='main-content'>
          <ProductContainer/>
          <CartContainer/>
        </main>
      </CartProvider>
    </LayoutContext.Provider>
  )
}

export default App

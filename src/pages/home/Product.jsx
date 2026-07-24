import { formatmoney } from "../../utils/money";
import { useState,useRef } from "react";
import axios from "axios";
export function Product({ product ,loadCart}) {
  const [quantity, setQuanity] = useState(1);
  const [visible,setVisibile]=useState(false);
  const timeoutIdRef = useRef(null);
    const addToCart=async()=>{
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity
    });
    await loadCart();
     if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    setVisibile(true)

    timeoutIdRef.current=setTimeout(()=>{
     setVisibile(false)
    },2000);
    
  };
  
  const updateCart = (event) => {
    const selectedvalue = event.target.value;
    setQuanity(Number(selectedvalue));
  };

  return (
    <div key={product.id} className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img className="product-image" 
         data-testid="product-image"
        src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid='product-rating-stars-image'
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatmoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={updateCart}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{opacity:visible?1:0,}}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary" 
      data-testid="add-cart-btn" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

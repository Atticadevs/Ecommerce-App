import axios from "axios";
import { formatmoney } from "../../utils/money";
import { useState } from "react";
export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const setCartQuantity = (event) => {
    const inputValue = event.target.value;
    setQuantity(Number(inputValue));
  };
  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity,
      });
      await loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };
  const keyQuantityUpdate=(event)=>{
        if(event.key==='Enter')
        {
          updateQuantity();
        }
        else if(event.key ==='Escape')
       {
         setQuantity(cartItem.quantity);
         setIsUpdatingQuantity(false);
       }
       else {
        return ;
       }
  }
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatmoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <span>
          Quantity:
          {isUpdatingQuantity ? (
            <input
              class="quantity-update"
              type="text"
              value={quantity}
              onChange={setCartQuantity}
              onKeyDown={keyQuantityUpdate}
            />
          ) : (
            <span className="quantity-label">{cartItem.quantity}</span>
          )}
        </span>
        <span
          className="update-quantity-link link-primary"
          onClick={updateQuantity}
        >
          Update
        </span>
        <span
          className="delete-quantity-link link-primary"
          onClick={deleteCartItem}
        >
          Delete
        </span>
      </div>
    </div>
  );
}

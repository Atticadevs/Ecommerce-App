export function cartQuantity(cart)
{
     let totalQuanity = 0;
  cart.forEach((cartItems) => {
    totalQuanity += cartItems.quantity;
  });
  
  return totalQuanity;
}
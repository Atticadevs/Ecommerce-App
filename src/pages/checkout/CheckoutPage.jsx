import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import "./Checkout.css";
import "./Checkout-header.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const Response1 = await axios.get("/api/payment-summary");
      setPaymentSummary(Response1.data);
    };
    fetchPaymentSummary();
  }, [cart]);
  
useEffect(()=>{
   const fetchDeliveryOptions=async()=>{
        const Response2 = await axios.get(
        "api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(Response2.data);
   }
   fetchDeliveryOptions();
},[]);
  return (
    <>
      <title>Checkout</title>
      <Header cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />
          <PaymentSummary 
            paymentSummary={paymentSummary}  
            loadCart={loadCart}
           />
        </div>
      </div>
    </>
  );
}

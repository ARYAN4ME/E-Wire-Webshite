import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import "./Cart.scss";
import CartItem from './CartItem/CartItem';
import { useContext } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js"
import { makePaymentRequest } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const Cart = ({ setShowCart }) => {
    const navigator = useNavigate();
    const { cartItem, cartSubTotal } = useContext(Context);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItem,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const returnToShop = () =>{
        navigator("/");
        setShowCart(false);
    }
    

    return <div className="cart-panel">
        <div className="opac-layer"></div>
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Cart</span>
                <span className="close-btn" onClick={() => setShowCart(false)}>
                    <MdClose />
                    <span className="text">close</span>
                </span>
            </div>
            {!cartItem?.length && (
                <div className="empty-cart">
                    <BsCartX />
                    <span>No Product in the cart.</span>
                    <button onClick={returnToShop} className="return-cta">Return to shop</button>
                </div>
            )}

            {!!cartItem?.length && (
                <>
                    <CartItem setShowCart={setShowCart}/>
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Subtotal:</span>
                            <span className="text total">&#8377;{cartSubTotal}</span>
                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={handlePayment}>Checkout</button>
                        </div>
                    </div>
                </>
            )}

        </div>
    </div>;
};

export default Cart;

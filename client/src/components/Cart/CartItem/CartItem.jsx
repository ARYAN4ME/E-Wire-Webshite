import { MdClose } from "react-icons/md";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import "./CartItem.scss";
import { useContext } from "react";
import { Context } from "../../../utils/context";
const CartItem = () => {
    const {cartItem, handleRemoveFromCart, handleCartProductQuantity} = useContext(Context);
    return <div className="cart-products">
        {cartItem.map(item => (
            <div key={item.id} className="cart-product">
            <div className="img-container">
                <img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt="" />
            </div>
            <div className="prod-details">
                <dpan className="name">{item.attributes.title}</dpan>
                <MdClose className="close-btn" onClick={()=>handleRemoveFromCart(item)}/>
                <div className="quantity-button ">
                    <span onClick={()=> handleCartProductQuantity('dec',item)}>-</span>
                    <span>{item.attributes.quantity}</span>
                    <span onClick={()=> handleCartProductQuantity('inc',item)}>+</span>
                </div>
                <div className="text">
                    <span>{item.attributes.quantity}</span>
                    <span>x</span>
                    <div className="space">
                        <span className="">&#8377;{item.attributes.price}</span>
                        <span className="highlight last">&#8377;{item.attributes.price * item.attributes.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
        ))}
        
    </div>;
};

export default CartItem;

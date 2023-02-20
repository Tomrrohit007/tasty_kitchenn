import "./index.css";
import { useHistory } from "react-router-dom";


function PaymentPage() {
  let history = useHistory();
  return (
    <div  className="payment-cont main-container"
    >
      <img
        src="https://res.cloudinary.com/dzqa2dgzj/image/upload/v1676219736/Zomato%20clone/check-circle.1_1_ivhodq.svg"
        alt=""
        className="payment-img"
      />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-para">
        Thank you for ordering <br /> Your payment have Successfully completed
      </p>
      <button 
        className="go-to-home"
        onClick={() => history.push("/")}
      >
        Go To Home Page
      </button>
    </div>
  );
}

export default PaymentPage;
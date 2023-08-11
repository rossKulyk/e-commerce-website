import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentButton,
  PaymentFormContainer,
  FormContainer,
} from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe(); // to make req to stripe
  const elements = useElements(); // safely pass the collected payment information

  // payment handler
  const paymentHndler = async (e) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();

    // Stripe.js hasn't yet loaded. Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;
  };
  return (
    <PaymentFormContainer>
      <FormContainer>
        <h1>Credit Card Payment</h1>
        <CardElement>
          <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted}>
            Pay now
          </PaymentButton>
        </CardElement>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;

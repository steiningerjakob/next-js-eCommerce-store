import 'bootstrap/dist/css/bootstrap.min.css';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { clearShoppingCart } from '../util/cookies';

const headingStyles = css`
  font-size: 1.5em;
  font-weight: 600;
  margin: 8px 0;
`;

const formContainer = css`
  margin-top: 24px;
  width: 640px;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 4px;
  padding: 16px;
`;

const formSectionStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

const formGroupStyles = css`
  margin-right: 32px;
  margin-bottom: 16px;
`;

const labelStyles = css`
  width: 240px;
  display: flex;
  flex-direction: column;
  margin-right: 32px;
  margin-bottom: 4px;
  font-size: 0.9rem;
  color: #333;
`;

const inputStyles = css`
  padding-left: 8px;
`;

const checkoutButtonStyles = (variant = 'main') => css`
  font-weight: 600;
  font-size: 1.1em;
  background-color: #153243;
  color: white;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  margin: 24px 0;
  width: 272px;
  height: 72px;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }

  ${variant === 'small' &&
  css`
    font-weight: 500;
    font-size: 0.9rem;
    width: 240px;
    height: 36px;
    margin: 8px 0 0 0;
  `}
`;

export default function CheckoutForm(props) {
  // Source for form validation approach:
  // https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [formIsValidated, setFormIsValidated] = useState(false);

  function setField(field, value) {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  }

  function findFormErrors() {
    const {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      address,
      postalCode,
      city,
      country,
      creditCardNumber,
      expiration,
      nameOnCard,
      cvv,
    } = form;
    const newErrors = {};
    // "name-like" errors
    if (!firstName || firstName === '') {
      newErrors.firstName = 'Cannot be blank!';
    } else if (firstName.length > 40) {
      newErrors.firstName = 'Name is too long!';
    }
    if (!lastName || lastName === '') {
      newErrors.lastName = 'Cannot be blank!';
    } else if (lastName.length > 40) {
      newErrors.lastName = 'Name is too long!';
    }
    if (!nameOnCard || nameOnCard === '') {
      newErrors.nameOnCard = 'Cannot be blank!';
    } else if (nameOnCard.length > 40) {
      newErrors.nameOnCard = 'Name is too long!';
    }
    // "address-like" errors
    if (!address || address === '') newErrors.address = 'Cannot be blank!';
    if (!city || city === '') newErrors.city = 'Cannot be blank!';
    if (!country || country === '') {
      newErrors.country = 'Cannot be blank!';
    } else if (country !== 'Austria') {
      newErrors.country = 'Shipping address must be in Austria!';
    }
    // "number-like" error
    if (!phoneNumber || phoneNumber === '') {
      newErrors.phoneNumber = 'Cannot be blank!';
    } else if (phoneNumber.length > 15) {
      newErrors.phoneNumber = 'Phone number is too long!';
    }
    if (!postalCode || postalCode === '') {
      newErrors.postalCode = 'Cannot be blank!';
    } else if (postalCode.length !== 4) {
      newErrors.postalCode = 'Invalid postal code!';
    }
    if (!creditCardNumber || creditCardNumber === '') {
      newErrors.creditCardNumber = 'Cannot be blank!';
    } else if (creditCardNumber.length < 16 || creditCardNumber.length > 20) {
      newErrors.creditCardNumber = 'Invalid credit card number!';
    }
    if (!expiration || expiration === '') {
      newErrors.expiration = 'Cannot be blank!';
    } else if (expiration.length !== 5) {
      newErrors.expiration = 'Invalid expiration!';
    }
    if (!cvv || cvv === '') {
      newErrors.cvv = 'Cannot be blank!';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'Invalid CVV!';
    }
    // email address error
    if (!emailAddress || emailAddress === '') {
      newErrors.emailAddress = 'Cannot be blank!';
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      alert('You are all set! Please click "Place your order"');
      setFormIsValidated(true);
    }
  }

  return (
    <div>
      <div css={formContainer}>
        <Form>
          <div css={headingStyles}>Customer information</div>
          <section css={formSectionStyles}>
            <Form.Group css={formGroupStyles} data-cy="form-group">
              <Form.Label css={labelStyles}>First name</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('firstName', e.target.value)}
                placeholder="Jane"
                isInvalid={!!errors.firstName}
                data-cy="checkout-form-firstName"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Last name</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('lastName', e.target.value)}
                placeholder="Doe"
                isInvalid={!!errors.lastName}
                data-cy="checkout-form-lastName"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Email address</Form.Label>
              <Form.Control
                type="email"
                css={inputStyles}
                onChange={(e) => setField('emailAddress', e.target.value)}
                placeholder="jane@doe.com"
                isInvalid={!!errors.emailAddress}
                data-cy="checkout-form-emailAddress"
              />
              <Form.Control.Feedback type="invalid">
                {errors.emailAddress}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Phone number</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('phoneNumber', e.target.value)}
                placeholder="0676/1234567"
                isInvalid={!!errors.phoneNumber}
                data-cy="checkout-form-phoneNumber"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </section>
          <div css={headingStyles}>Shipping information</div>
          <section css={formSectionStyles}>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Address</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('address', e.target.value)}
                placeholder="Sappho Street 1"
                isInvalid={!!errors.address}
                data-cy="checkout-form-address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Postal code</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('postalCode', e.target.value)}
                placeholder="1090"
                isInvalid={!!errors.postalCode}
                data-cy="checkout-form-postalCode"
              />
              <Form.Control.Feedback type="invalid">
                {errors.postalCode}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>City</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('city', e.target.value)}
                placeholder="Vienna"
                isInvalid={!!errors.city}
                data-cy="checkout-form-city"
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Country</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('country', e.target.value)}
                placeholder="Austria"
                isInvalid={!!errors.country}
                data-cy="checkout-form-country"
              />
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </section>
          <div css={headingStyles}>Billing information</div>
          <section css={formSectionStyles}>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Credit card number</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('creditCardNumber', e.target.value)}
                placeholder="1111 2222 3333 4444"
                isInvalid={!!errors.creditCardNumber}
                data-cy="checkout-form-creditCardNumber"
              />
              <Form.Control.Feedback type="invalid">
                {errors.creditCardNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Expiration</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('expiration', e.target.value)}
                placeholder="MM/YY"
                isInvalid={!!errors.expiration}
                data-cy="checkout-form-expiration"
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiration}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>Name on card</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('nameOnCard', e.target.value)}
                placeholder="Jane Doe"
                isInvalid={!!errors.nameOnCard}
                data-cy="checkout-form-nameOnCard"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nameOnCard}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group css={formGroupStyles}>
              <Form.Label css={labelStyles}>CVV</Form.Label>
              <Form.Control
                type="text"
                css={inputStyles}
                onChange={(e) => setField('cvv', e.target.value)}
                placeholder="123"
                isInvalid={!!errors.cvv}
                data-cy="checkout-form-cvv"
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvv}
              </Form.Control.Feedback>
            </Form.Group>
          </section>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="secondary"
            data-cy="checkout-form-submit-button"
          >
            Submit information
          </Button>
        </Form>
      </div>
      <div data-cy="checkout-place-order-element">
        {formIsValidated === true ? (
          <Link href="/success">
            <a data-cy="checkout-place-order-link">
              <button
                css={checkoutButtonStyles()}
                onClick={() => {
                  clearShoppingCart();
                  props.setShoppingCart(clearShoppingCart());
                }}
              >
                Place your order
              </button>
            </a>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

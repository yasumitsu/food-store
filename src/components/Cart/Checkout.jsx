import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim() === 5;

const Checkout = ({ onCancel }) => {
	const [ getFormInputsValidity, setFormInputsValidity ] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid
		});

		const formIsValid =
			enteredCityIsValid && enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid;

		if (!formIsValid) {
			return;
		}
	};

	return (
		<form className={styles.form} onSubmit={confirmHandler}>
			<div className={`${styles.control} ${getFormInputsValidity.name ? '' : styles.invalid}`}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!getFormInputsValidity.name && <p>Please enter a valid name.</p>}
			</div>
			<div className={`${styles.control} ${getFormInputsValidity.street ? '' : styles.invalid}`}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!getFormInputsValidity.street && <p>Please enter a valid address.</p>}
			</div>
			<div className={`${styles.control} ${getFormInputsValidity.postalCode ? '' : styles.invalid}`}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!getFormInputsValidity.postalCode && <p>Please enter a valid postal code.</p>}
			</div>
			<div className={`${styles.control} ${getFormInputsValidity.city ? '' : styles.invalid}`}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!getFormInputsValidity.city && <p>Please enter a valid city.</p>}
			</div>
			<div className={styles.actions}>
				<button type="button" onClick={onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;

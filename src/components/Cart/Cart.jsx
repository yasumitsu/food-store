import { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onClose }) => {
	const [ getCheckout, setCheckout ] = useState(false);
	const [ getSubmitting, setSubmitting ] = useState(false);
	const [ getSubmitted, setSubmitted ] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const orderHandler = () => {
		setCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setSubmitting(true);
		await fetch('https://true-harmony-355-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items
			})
		});
		setSubmitting(false);
		setSubmitted(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={styles.actions}>
			<button className={styles['button--alt']} onClick={onClose}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{getCheckout && <Checkout onCancel={onClose} onConfirm={submitOrderHandler} />}
			{!getCheckout && modalActions}
		</Fragment>
	);

	const submittingContent = <p>Sending data to server...</p>;
	const submittedContent = (
		<Fragment>
			<p>Order success!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={onClose}>
					Close
				</button>
			</div>
		</Fragment>
	);

	return (
		<Modal onClose={onClose}>
			{!getSubmitting && !getSubmitted && cartModalContent}
			{getSubmitting && submittingContent}
			{!getSubmitting && getSubmitted && submittedContent}
		</Modal>
	);
};

export default Cart;

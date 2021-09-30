import React, { useContext } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({ onClick }) => {
	const cartCtx = useContext(CartContext);

	const cartItemsQty = cartCtx.items.reduce((cur, item) => cur + item.amount, 0);

	return (
		<button className={styles.button} onClick={onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{cartItemsQty}</span>
		</button>
	);
};

export default HeaderCartButton;

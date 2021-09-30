import React, { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({ onClick }) => {
	const [ btnBump, setbtnBump ] = useState();

	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const cartItemsQty = items.reduce((cur, item) => cur + item.amount, 0);

	const btnClasses = `${styles.button} ${btnBump ? styles.bump : ''}`;

	useEffect(
		() => {
			if (items.length === 0) return;

			setbtnBump(true);

			const timer = setTimeout(() => {
				setbtnBump(false);
			}, 300);

			return () => clearTimeout(timer);
		},
		[ items ]
	);

	return (
		<button className={btnClasses} onClick={onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{cartItemsQty}</span>
		</button>
	);
};

export default HeaderCartButton;

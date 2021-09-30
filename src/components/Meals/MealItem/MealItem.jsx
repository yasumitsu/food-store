import { useContext } from 'react';
import styles from './MealItem.module.css';

import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

const MealItem = ({ id, name, description, price }) => {
	const cartCtx = useContext(CartContext);

	const priceFixed = `$${price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id,
			name,
			amount,
			price
		});
		console.log(cartCtx);
	};

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{priceFixed}</div>
			</div>
			<div>
				<MealItemForm onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;

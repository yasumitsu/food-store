import React, { Fragment } from 'react';

import styles from './Header.module.css';
import foodImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
	return (
		<Fragment>
			<header className={styles.header}>
				<h1>Food Store</h1>
				<HeaderCartButton />
			</header>
			<div className={styles['main-image']}>
				<img src={foodImage} alt="Table full of food" />
			</div>
		</Fragment>
	);
};

export default Header;

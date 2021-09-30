import { Fragment, useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
	const [ cartDisplay, setCartDisplay ] = useState(false);

	const showCartHandler = () => {
		setCartDisplay(true);
	};

	const hideCartHandler = () => {
		setCartDisplay(false);
	};

	return (
		<Fragment>
			{cartDisplay && <Cart onClose={hideCartHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals />
			</main>
		</Fragment>
	);
}

export default App;

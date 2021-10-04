import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';

import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const [ getMeals, setMeals ] = useState([]);
	const [ getLoading, setLoading ] = useState(true);
	const [ getDbError, setDbError ] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://true-harmony-355-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
			);

			if (!response.ok) throw new Error('Something went wrong.');

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price
				});
			}

			setMeals(loadedMeals);
			setLoading(false);
		};

		fetchMeals().catch((error) => {
			setLoading(false);
			setDbError(error.message);
		});
	}, []);

	if (getLoading) {
		return (
			<section className={styles.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (getDbError) {
		return (
			<section className={styles.mealsError}>
				<p>{getDbError}</p>
			</section>
		);
	}

	const mealsList = getMeals.map((meal) => (
		<MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />
	));

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;

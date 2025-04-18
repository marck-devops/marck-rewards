import React, { useEffect, useState } from 'react';
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';

const ProductEdit = ({ dataProvider, ...props }) => {
	const [categories, setCategories] = useState([]);
	const [stores, setStores] = useState([]);

	useEffect(() => {
		// Fetch categories from your API
		const fetchCategories = async () => {
			try {
				const categoriesResponse = await dataProvider.getList('category', {
					pagination: { page: 1, perPage: 100 },
					sort: { field: 'name', order: 'ASC' }
				});
				setCategories(categoriesResponse.data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		// Fetch stores from your API
		const fetchStores = async () => {
			try {
				const storesResponse = await dataProvider.getList('store', {
					pagination: { page: 1, perPage: 100 },
					sort: { field: 'name', order: 'ASC' }
				});
				setStores(storesResponse.data);
			} catch (error) {
				console.error('Error fetching stores:', error);
			}
		};

		fetchCategories();
		fetchStores();
	}, []);
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Edit Product
				</Typography>
			</Grid>
			<Edit {...props}>
				<SimpleForm>
					<TextInput source='title' />
					<TextInput source='description' />
					<TextInput source='productReceiptPoints' />
					<SelectInput
						source='category.id'
						choices={categories.map((category) => ({ id: category.id, name: category.name }))}
					/>
					<SelectInput
						source='store.id'
						choices={stores.map((store) => ({ id: store.id, name: store.name }))}
					/>
				</SimpleForm>
			</Edit>
		</>
	);
};

export default ProductEdit;

import React from 'react';
import { Create, SimpleForm, TextInput, ImageInput, ImageField, BooleanInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function StoreCreate(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Create Store
				</Typography>
			</Grid>
			<Create title='create a post' {...props}>
				<SimpleForm>
					<TextInput source='foursquareId' />
					<TextInput source='name' />
					<TextInput source='address' />
					<TextInput source='region' />
					<TextInput source='postCode' />
					<TextInput source='timezone' />
					<TextInput source='latitude' />
					<TextInput source='longitude' />
					<TextInput source='storeCheckInPoints' />
					<TextInput source='storeReceiptPoints' />
					<BooleanInput label='inStorePartner' source='inStorePartner' />
					<ImageInput source='storePhoto' label='Store Photo'>
						<ImageField source='src' title='title' />
					</ImageInput>
				</SimpleForm>
			</Create>
		</>
	);
}

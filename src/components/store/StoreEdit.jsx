import * as React from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput, ImageInput, ImageField } from 'react-admin';
import { Grid, Typography } from '@mui/material';

const StoreEdit = (props) => {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Edit Store
				</Typography>
			</Grid>
			<Edit {...props}>
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
					<ImageField source='storePhoto' title='title' />
					<ImageInput source='storePhoto' label='Store Photo' required={false}>
						<ImageField source='src' title='title' />
					</ImageInput>
				</SimpleForm>
			</Edit>
		</>
	);
};

export default StoreEdit;

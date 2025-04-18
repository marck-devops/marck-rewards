import * as React from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput, NumberInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';

const UserEdit = (props) => {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Edit User
				</Typography>
			</Grid>
			<Edit {...props}>
				<SimpleForm>
					<TextInput disabled source='id' />
					<TextInput source='firstName' />
					<TextInput source='lastName' />
					<TextInput source='email' />
					<NumberInput source='currentPoints' />
					<TextInput source='city' />
					<TextInput source='state' />
					<TextInput source='address' />
					<TextInput source='firebaseId' />
					<TextInput source='phoneNumber' />
					<BooleanInput label='isAdmin' source='isAdmin' />
					<BooleanInput label='isActive' source='isActive' />
				</SimpleForm>
			</Edit>
		</>
	);
};

export default UserEdit;

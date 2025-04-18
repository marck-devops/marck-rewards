import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	BooleanInput,
	NumberInput,
	required,
	minValue,
	number,
	PasswordInput
} from 'react-admin';
import { Grid, Typography } from '@mui/material';

const validateEmail = [required()];
const validateFirebaseId = [required(), number(), minValue(0)];

export default function UserCreate(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Create User
				</Typography>
			</Grid>
			<Create title='create a post' {...props}>
				<SimpleForm>
					<TextInput source='firstName' />
					<TextInput source='lastName' />
					<TextInput source='email' validate={required(validateEmail)} />
					<NumberInput source='currentPoints' />
					<TextInput source='city' />
					<TextInput source='state' />
					<TextInput source='address' />
					<TextInput source='firebaseId' validate={validateFirebaseId} />
					<TextInput source='phoneNumber' />
					<PasswordInput source='password' sx={{ width: '17.5%' }} />
					<BooleanInput label='isAdmin' source='isAdmin' />
					<BooleanInput label='isActive' source='isActive' />
				</SimpleForm>
			</Create>
		</>
	);
}

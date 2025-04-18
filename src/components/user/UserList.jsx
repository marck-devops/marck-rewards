import React from 'react';
import { Datagrid, List, TextField, EditButton, DeleteButton } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function UserList(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Users
				</Typography>
			</Grid>
			<List {...props}>
				<Datagrid>
					<TextField source='firstName' />
					<TextField source='lastName' />
					<TextField source='email' />
					<TextField source='city' />
					<TextField source='state' />
					<TextField source='address' />
					<TextField source='phoneNumber' />
					<TextField source='currentPoints' />
					{/* <TextField source='firebaseId' /> */}
					{/* <TextField source='isActive' /> */}
					<EditButton basePath='/user' />
					<DeleteButton basePath='/user' />
				</Datagrid>
			</List>
		</>
	);
}

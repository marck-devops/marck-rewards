import React from 'react';
import { Datagrid, List, TextField, EditButton, DeleteButton, ShowButton } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function StoreList(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Stores
				</Typography>
			</Grid>
			<List {...props}>
				<Datagrid>
					<TextField source='name' />
					<TextField source='region' />
					<TextField source='postCode' />
					<TextField source='timezone' />
					<TextField source='storeCheckInPoints' />
					<TextField source='storeReceiptPoints' />
					<ShowButton basePath='/store' />
					<EditButton basePath='/store' />
					<DeleteButton basePath='/store' />
				</Datagrid>
			</List>
		</>
	);
}

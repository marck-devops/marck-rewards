import React from 'react';
import { Datagrid, List, TextField, EditButton, DeleteButton, FunctionField } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function ProductList(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Products
				</Typography>
			</Grid>
			<List {...props}>
				<Datagrid>
					<TextField source='title' />
					<TextField source='description' />
					<TextField source='productReceiptPoints' />
					<FunctionField
						label='Category'
						render={(record) => (record.category ? record.category.name : '')}
					/>
					<FunctionField
						label='Store'
						render={(record) => {
							return record.store ? record.store.name : '';
						}}
					/>
					<EditButton basePath='/product' />
					<DeleteButton basePath='/product' />
				</Datagrid>
			</List>
		</>
	);
}

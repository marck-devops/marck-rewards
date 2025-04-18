import React from 'react';
import { Datagrid, List, TextField, EditButton, DeleteButton } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function CategoryList(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Categories
				</Typography>
			</Grid>
			<List {...props}>
				<Datagrid>
					<TextField source='name' />
					<EditButton basePath='/category' />
					<DeleteButton basePath='/category' />
				</Datagrid>
			</List>
		</>
	);
}

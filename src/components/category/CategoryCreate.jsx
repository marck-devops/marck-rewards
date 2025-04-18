import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';

export default function CategoryCreate(props) {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Create Category
				</Typography>
			</Grid>
			<Create title='create a post' {...props}>
				<SimpleForm>
					<TextInput source='name' />
				</SimpleForm>
			</Create>
		</>
	);
}

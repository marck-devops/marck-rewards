import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { Grid, Typography } from '@mui/material';

const CategoryEdit = (props) => {
	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					Edit Category
				</Typography>
			</Grid>
			<Edit {...props}>
				<SimpleForm>
					<TextInput source='name' />
				</SimpleForm>
			</Edit>
		</>
	);
};

export default CategoryEdit;

import React, { useState } from 'react';
import {
	SimpleShowLayout,
	Show,
	TextField,
	ImageField,
	FunctionField,
	useRedirect
} from 'react-admin';
import { Grid, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material';

const ImagePreviewDialog = ({ open, onClose, imageSrc }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Image Preview</DialogTitle>
			<DialogContent>
				<img src={imageSrc} alt='Preview' style={{ maxWidth: '100%', maxHeight: '100%' }} />
			</DialogContent>
		</Dialog>
	);
};

const StoreShow = (props) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImageSrc, setPreviewImageSrc] = useState('');
	const redirect = useRedirect();

	const handleImageClick = (record) => {
		setPreviewImageSrc(record.storePhoto);
		setPreviewOpen(true);
	};

	const handleClosePreview = () => {
		setPreviewOpen(false);
	};

	const handleViewProductsClick = (record) => {
		// Redirect to the product list page with the store ID filter
		redirect(`/product?storeId=${record.id}`);
	};

	return (
		<>
			<Show {...props}>
				<SimpleShowLayout>
					<Grid>
						<Typography variant='h5' sx={{ padding: '10px 0px' }}>
							Store Detail
						</Typography>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Name
							</Typography>
							<TextField source='name' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Region
							</Typography>
							<TextField source='region' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								PostCode
							</Typography>
							<TextField source='postCode' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Timezone
							</Typography>
							<TextField source='timezone' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Address
							</Typography>
							<TextField source='address' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								StoreCheckInPoints
							</Typography>
							<TextField source='storeCheckInPoints' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								StoreReceiptPoints
							</Typography>
							<TextField source='storeReceiptPoints' />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Products
							</Typography>
							<FunctionField
								label='View Products'
								render={(record) => (
									<button
										style={{ cursor: 'pointer', color: '#333' }}
										onClick={() => handleViewProductsClick(record)}
									>
										View Products
									</button>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography variant='subtitle1' sx={{ color: '#9fd194' }}>
								Store Photo
							</Typography>
							<FunctionField
								label='image'
								render={(record) => (
									<ImageField
										source='storePhoto'
										title='Store Photo'
										sx={{
											cursor: 'pointer',
											'& img': { maxWidth: 110, maxHeight: 40, objectFit: 'contain' }
										}}
										onClick={() => handleImageClick(record)}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</SimpleShowLayout>
			</Show>

			<ImagePreviewDialog
				open={previewOpen}
				onClose={handleClosePreview}
				imageSrc={previewImageSrc}
			/>
		</>
	);
};

export default StoreShow;

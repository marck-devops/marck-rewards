import React from 'react';
import {
	SimpleShowLayout,
	Show,
	FunctionField,
	useDataProvider,
	useNotify,
	useRedirect
} from 'react-admin';
import { Grid, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const OcrShow = (props) => {
	const dataProvider = useDataProvider();
	const notify = useNotify();
	const redirect = useRedirect();

	const handleApproveClick = async (record, ocrScanResource) => {
		const { id } = record || {};
		const updatedData = { status: 'approved', id };

		try {
			// Make the update call
			const { data } = await dataProvider.update(ocrScanResource, {
				id: id,
				data: updatedData
			});
			console.log('Updated data:', data);
			notify('Points awarded to the user successfully!', 'info');
			setTimeout(() => {
				redirect('/ocr_scan');
			}, 1000);
		} catch (error) {
			console.error('Error updating data:', error);
			notify('Error approving record', 'warning');
		}
	};

	const handleRejectClick = async (record, ocrScanResource) => {
		const { id } = record || {};
		const updatedData = { status: 'rejected', id };

		try {
			// Make the update call
			const { data } = await dataProvider.update(ocrScanResource, {
				id: id,
				data: updatedData
			});
			console.log('Updated data:', data);
			notify('Record Rejected successfully', 'info');
			setTimeout(() => {
				redirect('/ocr_scan');
			}, 1000);
		} catch (error) {
			console.error('Error updating data:', error);
			notify('Error rejecting record', 'warning');
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'approved':
				return 'green';
			case 'rejected':
				return 'red';
			default:
				return 'inherit';
		}
	};

	return (
		<Show {...props}>
			<SimpleShowLayout>
				<Grid>
					<Typography variant='h5' sx={{ padding: '10px 0px' }}>
						OCR_Scan Detail
						<FunctionField
							label='Status'
							render={(record) => (
								<span
									style={{
										fontWeight: 'bold',
										fontSize: '14px',
										textTransform: 'uppercase',
										letterSpacing: '0.9px',
										padding: '10px',
										color: getStatusColor(record.status)
									}}
								>
									{record.status}
								</span>
							)}
						/>
					</Typography>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Typography variant='subtitle1' sx={{ color: '#9fd194', fontWeight: 'bold' }}>
							Store Products
						</Typography>
						<FunctionField
							label='Products'
							render={(record) => {
								const storeProducts = record.store?.products || [];
								return (
									<List dense sx={{ padding: '0px' }}>
										{storeProducts.map((product) => (
											<ListItem key={product.id} sx={{ padding: '0px' }}>
												<ListItemText primary={product.title} />
											</ListItem>
										))}
									</List>
								);
							}}
						/>
					</Grid>

					<Grid item xs={3}>
						<Typography variant='subtitle1' sx={{ color: '#9fd194', fontWeight: 'bold' }}>
							OCR Products
						</Typography>
						<FunctionField
							label='Products'
							render={(record) => {
								const storeProducts = record.products || [];
								return (
									<List dense sx={{ padding: '0px' }}>
										{storeProducts.map((product) => (
											<ListItem key={product.id} sx={{ padding: '0px' }}>
												<ListItemText primary={product.title} />
											</ListItem>
										))}
									</List>
								);
							}}
						/>
					</Grid>

					<Grid item xs={3}>
						<Typography variant='subtitle1' sx={{ color: '#9fd194', fontWeight: 'bold' }}>
							Points Reward
						</Typography>
						<FunctionField
							label='Products'
							render={(record) => {
								const pointsReward = record.products || [];
								return (
									<List dense sx={{ padding: '0px' }}>
										{pointsReward.map((product) => (
											<ListItem key={product.id} sx={{ padding: '0px' }}>
												<ListItemText primary={product.productReceiptPoints} />
											</ListItem>
										))}
									</List>
								);
							}}
						/>
					</Grid>
					<Grid item xs={3}>
						<FunctionField
							label='Products'
							render={(record) => {
								if (record && (record.status === 'approved' || record.status === 'rejected')) {
									return null;
								}
								return (
									<>
										<Button
											sx={{
												margin: '5px',
												backgroundColor: 'green',
												color: 'white',
												border: 'none',
												'&:hover': {
													backgroundColor: 'darkgreen',
													border: 'none'
												}
											}}
											onClick={() => handleApproveClick(record, 'ocr_scan')}
										>
											Approve
										</Button>
										<Button
											sx={{
												margin: '5px',
												backgroundColor: '#be2626',
												border: 'none',
												width: '90px',
												color: 'white',
												'&:hover': {
													backgroundColor: '#a61e1e',
													border: 'none'
												}
											}}
											onClick={() => handleRejectClick(record, 'ocr_scan')}
										>
											Reject
										</Button>
									</>
								);
							}}
						/>
					</Grid>
				</Grid>
			</SimpleShowLayout>
		</Show>
	);
};

export default OcrShow;

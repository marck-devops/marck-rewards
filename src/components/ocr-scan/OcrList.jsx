import React, { useState } from 'react';
import { Datagrid, List, ImageField, FunctionField, ShowButton, DateField } from 'react-admin';
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

export default function OcrList(props) {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImageSrc, setPreviewImageSrc] = useState('');

	const handleImageClick = (record) => {
		setPreviewImageSrc(record.image);
		setPreviewOpen(true);
	};

	const handleClosePreview = () => {
		setPreviewOpen(false);
	};

	return (
		<>
			<Grid>
				<Typography variant='h5' sx={{ padding: '10px 0px' }}>
					OCR-Scan
				</Typography>
			</Grid>
			<List {...props} sort={{ field: 'approvedBy', order: 'DESC' }}>
				<Datagrid>
					<FunctionField
						label='image'
						render={(record) => (
							<ImageField
								source='image'
								title='image'
								sx={{
									cursor: 'pointer',
									'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' }
								}}
								onClick={() => handleImageClick(record)}
							/>
						)}
					/>

					<FunctionField
						label='user'
						render={(record) => {
							return record?.user ? record?.user?.firstName : '';
						}}
					/>
					<FunctionField
						label='Store'
						render={(record) => {
							return record?.store ? record?.store?.name : '';
						}}
					/>
					<FunctionField
						label='Status'
						render={(record) => (
							<span style={{ color: getStatusColor(record.status) }}>{record.status}</span>
						)}
					/>
					<DateField source='createdAt' label='Created At' showTime={false} />
					<FunctionField
						label='Approved By'
						render={(record) => {
							return record?.approvedBy ? record?.approvedBy?.firstName : '';
						}}
					/>

					<ShowButton basePath='/ocr_scan' />
				</Datagrid>
			</List>

			<ImagePreviewDialog
				open={previewOpen}
				onClose={handleClosePreview}
				imageSrc={previewImageSrc}
			/>
		</>
	);
}

import React from 'react';
import useAuth from '../auth/useAuth';
import dayjs from 'dayjs';
import Axios from 'axios';

function CreateRequest() {
	const { user } = useAuth();

	const [formData, setFormData] = React.useState({
		requestName: '',
		price: '',
		dueDate: '',
		sku: '',
		descriptionText: '',
        status: '',
        artist: '',
	});

    const artists = ['Fasil','Steph','Precious','Justin','Kalven']
    const statusOptions = ['Backlog', 'To-Do', 'In-Progress', 'Completed']

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setFormData(prevformData => ({
			...prevformData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		const date = {
			dateObj: dayjs(formData.dueDate),
			date: dayjs(formData.dueDate).format('MM/DD/YY'),
			weekday: dayjs(formData.dueDate).format('dddd'),
		};
		console.log(formData, 'New Request Attempt Sent');
		try {
			const response = await Axios({
				method: 'POST',
				data: {
					user: user._id,
					requestName: formData.requestName,
					price: formData.price,
					sku: formData.sku,
                    descriptionText: formData.descriptionText,
					status: formData.status,
                    artist: formData.artist,
					dueDate: date,
				},
				url: `${process.env.REACT_APP_API_URL}/request/createRequest`,
				withCredentials: true,
			});
			console.log('From Server:', response);
			event.target.reset();
		} catch (err) {
			console.log(err.response);
		}
	};

	const selectArtist = artists.map((el, i) => {
		return (
			<option key={i} value={el}>
				{el}
			</option>
		);
	});

    const selectStatus = statusOptions.map((el, i) => {
		return (
			<option key={i} value={el}>
				{el}
			</option>
		);
	});

	return (
		<div>
			<label
				htmlFor='createRequest-modal'
				className='btn btn-square btn-primary btn-sm'
			>
				<svg 
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-6 h-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M12 4.5v15m7.5-7.5h-15'
					/>
				</svg>
			</label>
			<input type='checkbox' id='createRequest-modal' className='modal-toggle' />
			<label htmlFor='createRequest-modal' className='modal cursor-pointer'>
				<label>
					<section className='flex flex-wrap items-center p-10'>
						<div className='card w-96 h-96 shadow-xl bg-base-100 overflow-scroll'>
							<div className='card-body'>
								<label
									htmlFor='createRequest-modal'
									className='btn btn-sm btn-circle absolute right-2 top-2'
								>
									✕
								</label>
								<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
									<label className='label flex flex-col gap-2'>
										<span>Artist Assigned:</span>
										<select
											className='select select-bordered w-full max-w-xs'
											id='artist'
											value={formData.artist}
											onChange={handleFormChange}
											name='artist'
											required
										>
											<option value=''>Select an Artist</option>
											{selectArtist}
										</select>
									</label>
									<label className='label flex flex-col gap-2'>
										<span>Due Date:</span>
										<input
											type='datetime-local'
											id='dueDate'
											name='dueDate'
											value={formData.dueDate}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
									<label className='label flex flex-col gap-2'>
										<span>Request Name:</span>
										<input
											type='text'
											id='requestName'
											name='requestName'
											value={formData.requestName}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
                                    <label className='label flex flex-col gap-2'>
										<span>Price:</span>
										<input
											type='number'
											id='price'
											name='price'
											value={formData.price}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
                                    <label className='label flex flex-col gap-2'>
										<span>SKU:</span>
										<input
											type='number'
											id='sku'
											name='sku'
											value={formData.sku}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
                                    <label className='label flex flex-col gap-2'>
										<span>Status Assigned:</span>
										<select
											className='select select-bordered w-full max-w-xs'
											id='status'
											value={formData.status}
											onChange={handleFormChange}
											name='status'
											required
										>
											<option value=''>Select an Status</option>
											{selectStatus}
										</select>
									</label>
                                    <label className='label flex flex-col gap-2'>
										<span>Description:</span>
										<input
											type='text'
											id='descriptionText'
											name='descriptionText'
											value={formData.descriptionText}
											onChange={handleFormChange}
											className='input input-bordered w-full max-w-xs'
											required
										/>
									</label>
									<div className='card-actions justify-center mt-4'>
										<button className='btn btn-primary'>
											Create New Request
										</button>
									</div>
								</form>
							</div>
						</div>
					</section>
				</label>
			</label>
		</div>
	);
}

export default CreateRequest;
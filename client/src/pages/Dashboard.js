import React from 'react';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';
import CreateRequest from '../components/CreateRequest'

function Dashboard() {
	const { user } = useAuth();

	return (
		<div>
			<Header />
			<div className='flex flex-col p-10 items-center gap-5'>
				<h2>This is the Dashboard page. (Private)</h2>
				<div className='flex flex-col'>
					<span>Authenticated as {user.userName}</span>
					<span>ID: {user._id}</span>
				</div>
				<CreateRequest />
			</div>
		</div>
	);
}

export default Dashboard;

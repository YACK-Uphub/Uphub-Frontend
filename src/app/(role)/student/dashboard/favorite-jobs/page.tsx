import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Favorite Jobs",
	description: "View your saved internship opportunities on UpHub",
};

const FavoriteJobsPage = () => {
	return (
		<div>
			<h1>Favorite Jobs</h1>
			<p>View and manage the internship opportunities you've saved for later.</p>
		</div>
	);
};

export default FavoriteJobsPage;
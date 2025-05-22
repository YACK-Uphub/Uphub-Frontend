import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Jobs Distribution",
	description: "View the distribution of internship jobs for your school on UpHub",
};

const JobsDistributionPage = () => {
	return (
		<div>
			<h1>Jobs Distribution</h1>
			<p>View the distribution of internship jobs by industry, location, and other metrics for your school.</p>
		</div>
	);
};

export default JobsDistributionPage;
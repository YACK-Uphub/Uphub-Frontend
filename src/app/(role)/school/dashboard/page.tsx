import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "School Dashboard",
	description: "View analytics and statistics for your school on UpHub",
};

const SchoolDashboardPage = () => {
	return (
		<div>
			<h1>School Dashboard</h1>
			<p>View analytics, statistics, and key metrics for your school's internship programs.</p>
		</div>
	);
};

export default SchoolDashboardPage;
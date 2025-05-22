import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Statistics",
	description: "View platform statistics and analytics on UpHub",
};

const StatisticsPage = () => {
	return (
		<div>
			<h1>Statistics</h1>
			<p>View platform statistics, analytics, and usage data for UpHub.</p>
		</div>
	);
};

export default StatisticsPage;
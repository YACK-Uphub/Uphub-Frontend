import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Feedback Dashboard",
	description: "View and manage feedback from students and companies on UpHub",
};

const FeedbackDashboardPage = () => {
	return (
		<div>
			<h1>Feedback Dashboard</h1>
			<p>View and manage feedback from students and partner companies about internship experiences.</p>
		</div>
	);
};

export default FeedbackDashboardPage;
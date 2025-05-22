import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Job Alerts",
	description: "Manage your models alert preferences on UpHub",
};

const JobAlertsPage = () => {
	return (
		<div>
			<h1>Job Alerts</h1>
			<p>Set up and manage notifications for new internship opportunities that match your preferences.</p>
		</div>
	);
};

export default JobAlertsPage;
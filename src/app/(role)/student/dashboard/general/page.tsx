import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "General Dashboard",
  description: "Overview of your internship journey on UpHub",
};

const GeneralDashboardPage = () => {
	return (
		<div>
			<h1>General Dashboard</h1>
			<p>View an overview of your internship journey, recent activities, and key metrics.</p>
		</div>
	);
};

export default GeneralDashboardPage;

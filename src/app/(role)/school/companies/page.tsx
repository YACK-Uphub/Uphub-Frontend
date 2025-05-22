import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Partner Companies",
	description: "Manage and view partner companies for your school on UpHub",
};

const PartnerCompaniesPage = () => {
	return (
		<div>
			<h1>Partner Companies</h1>
			<p>View and manage companies that partner with your school for internship opportunities.</p>
		</div>
	);
};

export default PartnerCompaniesPage;
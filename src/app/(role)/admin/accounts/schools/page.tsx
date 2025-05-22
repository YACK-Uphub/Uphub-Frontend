import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "School Accounts",
	description: "Manage school accounts on UpHub",
};

const SchoolAccountsPage = () => {
	return (
		<div>
			<h1>School Accounts</h1>
			<p>Manage school accounts and their access to UpHub.</p>
		</div>
	);
};

export default SchoolAccountsPage;
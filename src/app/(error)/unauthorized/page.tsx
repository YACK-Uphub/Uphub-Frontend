import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Unauthorized",
	description: "You don't have permission to access this page",
};

const UnauthorizedPage = () => {
	return (
		<div>
			<h1>403 - Unauthorized</h1>
			<p>You don't have permission to access this page.</p>
		</div>
	);
};

export default UnauthorizedPage;

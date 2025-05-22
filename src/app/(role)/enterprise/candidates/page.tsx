import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Candidates",
	description: "Browse potential candidates for your internship positions on UpHub",
};

const CandidatesPage = () => {
	return (
		<div>
			<h1>Candidates</h1>
			<p>Browse and search for potential candidates for your internship positions.</p>
		</div>
	);
};

export default CandidatesPage;
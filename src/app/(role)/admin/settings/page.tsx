import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: "Admin Settings",
	description: "Configure system settings for UpHub",
};

const AdminSettingsPage = () => {
	return (
		<div>
			<h1>Admin Settings</h1>
			<p>Configure system settings and preferences for UpHub.</p>
		</div>
	);
};

export default AdminSettingsPage;
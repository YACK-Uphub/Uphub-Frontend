import {Metadata} from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: "Contact Us",
	description: "Get in touch with the UpHub team",
};

const ContactUsPage = () => {
	return (
		<div>
			<h1>Contact Us</h1>
			<p>Have questions or feedback? Reach out to our team.</p>
		</div>
	);
};

export default ContactUsPage;

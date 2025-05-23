"use client"

import React from 'react';
import {toast} from "react-toastify";

// export const metadata: Metadata = {
// 	title: "Contact Us",
// 	description: "Get in touch with the UpHub team",
// };

const ContactUsPage = () => {

	const clickToast = () => toast('🦄 Wow so easy!');

	return (
		<div>
			<h1>Contact Us</h1>
			<p>Have questions or feedback? Reach out to our team.</p>

			<button onClick={clickToast}>Click me</button>
		</div>
	);
};

export default ContactUsPage;

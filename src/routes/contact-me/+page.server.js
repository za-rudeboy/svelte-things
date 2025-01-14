export const actions = {
	submitContact: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			return {
				success: true,
				message: 'Message sent successfully to Rudy'
			};
		} else {
			return { success: false };
		}
	}
};

import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
	const CLIENT_ID = process.env.OAUTH_CLIENT_ID!;
	const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET!;
	const TOKEN_URL = process.env.OAUTH_TOKEN_URL!;

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: 'client_credentials'
		})
	});

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify({ token: data.access_token }),
      };
};

export { handler };

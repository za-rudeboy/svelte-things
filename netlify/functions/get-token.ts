import { getStore, Store } from '@netlify/blobs';

interface TokenResponse {
	token: string;
}

interface CacheEntry {
	token: string;
	expiresAt: number;
}

const CACHE_KEY = 'oauth_token';
const CACHE_NAME = 'auth-tokens';
const CACHE_DURATION = 40 * 60 * 1000; // 40 minutes

export default async function handler(request, context): Promise<Response> {
	const CLIENT_ID = process.env.OAUTH_CLIENT_ID!;
	const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET!;
	const TOKEN_URL = process.env.OAUTH_TOKEN_URL!;
	const SCOPE = process.env.TOKEN_SCOPE!;

	const store = getStore({
		siteID: 'rudeboydotcom',
		token: process.env.NETLIFY_PAT!,
		name: CACHE_NAME
	});

	const cachedData = await store.get(CACHE_KEY);
	if (cachedData) {
		const { token, expiresAt } = JSON.parse(cachedData);
		if (expiresAt > Date.now()) {
			return new Response(JSON.stringify({ token } satisfies TokenResponse), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}

	const response = await getJwt(TOKEN_URL, CLIENT_ID, CLIENT_SECRET, SCOPE);
	const data = await response.json();
	await storeTokenInCache(store, data);

	return new Response(JSON.stringify({ token: data.access_token } satisfies TokenResponse), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}

async function getJwt(token_url: string, client_id: string, client_secret: string, scope: string) {
	return await fetch(token_url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'client_credentials',
			scope: scope
		})
	});
}

async function storeTokenInCache(store: Store, data: any) {

	const cacheEntry: CacheEntry = {
		token: data.access_token,
		expiresAt: Date.now() + CACHE_DURATION
	  };

	await store.set(
		CACHE_KEY,
		JSON.stringify(cacheEntry)
	);
}

import { Handler, Context } from '@netlify/functions';
import tokenHandler from './get-token';

interface RequestData {
  name: string;
  email: string;
  message: string;
}

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  try {
    // The method is available directly on the request object
    console.log('Request method:', request.method);

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await tokenHandler(request, context);
    
    // Parse the response
    const responseData = await response.json();

    return new Response(JSON.stringify({
      token: responseData.token
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error getting token:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error while fetching token'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

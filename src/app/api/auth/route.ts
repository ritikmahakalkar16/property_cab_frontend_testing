// This file used to contain a client helper. The client helper was moved to `src/lib/authApi.ts`.
// Keep minimal GET/POST handlers here to avoid Next.js treating the module as an incompatible app route.

export async function GET() {
  return new Response(JSON.stringify({ message: 'Not available' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ message: 'Not available' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
}


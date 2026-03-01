import { NextResponse } from 'next/server';
import { createUser, listUsers } from '@/lib/data/users';

export async function GET() {
  return NextResponse.json({ data: listUsers() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; email?: string };
  if (!body?.name || !body?.email) {
    return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
  }
  const user = createUser({ name: body.name, email: body.email });
  return NextResponse.json({ data: user }, { status: 201 });
}


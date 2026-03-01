import { NextResponse, NextRequest } from 'next/server';
import { deleteUser, getUser, updateUser } from '@/lib/data/users';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const user = getUser(id);
  if (!user) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ data: user });
}

export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const body = (await request.json()) as { name?: string; email?: string };
  const { id } = await ctx.params;
  const updated = updateUser(id, { name: body?.name, email: body?.email });
  if (!updated) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const ok = deleteUser(id);
  if (!ok) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}

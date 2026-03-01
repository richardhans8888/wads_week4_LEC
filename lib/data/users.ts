export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

let users: User[] = [
  {
    id: 'u_1',
    name: 'Alice',
    email: 'alice@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'u_2',
    name: 'Bob',
    email: 'bob@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function listUsers() {
  return users;
}

export function getUser(id: string) {
  return users.find((u) => u.id === id) || null;
}

export function createUser(input: { name: string; email: string }) {
  const now = new Date().toISOString();
  const id = `u_${Math.random().toString(36).slice(2, 9)}`;
  const user: User = { id, name: input.name, email: input.email, createdAt: now, updatedAt: now };
  users = [user, ...users];
  return user;
}

export function updateUser(id: string, input: Partial<Pick<User, 'name' | 'email'>>) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) return null;
  const updated: User = {
    ...users[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  users[idx] = updated;
  return updated;
}

export function deleteUser(id: string) {
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  return users.length !== before;
}

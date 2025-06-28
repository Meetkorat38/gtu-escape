import AdminPage from '@/features/admin/components/AdminPage'
import  jwt  from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const Admin = async () => {
 const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const secret = process.env.NEXT_SESSION_SECRET!;

  if (!token) redirect("/");

  try {
    const decoded = jwt.verify(token, secret) as { email: string; exp: number };

    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) redirect("/");

    return <AdminPage />;
  } catch{
    return redirect("/");
  }
}

export default Admin


import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
export const metadata = {
  title: "bookwise",
  description: "online borrowing book for bookwise",
};

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  if(!session) redirect('/sign-in');

  after(async() => {
    if(!session?.user?.id) return;

    // get the user and see if the last activity date is today
    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);

    if(user[0].lastActivityDate === new Date().toISOString().slice(0,10)) return;

    await db.update(users)
      .set({lastActivityDate: new Date().toISOString().slice(0,10)})
      .where(eq(users.id, session?.user?.id))
  })
  return (
    <div className="root-container">
      <Header session={session} />
      <div className="">{children}</div>
    </div>
  );
}


import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
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
  return (
    <div className="root-container">
      <Header session={session} />
      <div className="">{children}</div>
    </div>
  );
}

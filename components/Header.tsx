'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
export default function Header({session}: {session:Session}) {
    const pathname = usePathname();
  return <header className="flex mx-20 justify-between gap-5">
    <Link href='/'>Bookwise</Link>
    <ul className="flex flex-row items-center gap-8">
        <li>
            <Link href='/library'
                className={`text-base cursor-pointer capitalize ${pathname === '/library' ? 'text-purple-300' : 'text-purple-100'} `} >
                  { /*cn("text-base cursor-pointer capitalize", pathname === '/library' ? 'text-light-200': 'text-light-100')*/}
                library
            </Link>
        </li>

        <li>
          <Link href='/my-profile'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-purple-800">
                {getInitials(session?.user?.name || 'IN')}
              </AvatarFallback>
            </Avatar>

            Profile
          </Link>
        </li>
    </ul>
  </header>
}

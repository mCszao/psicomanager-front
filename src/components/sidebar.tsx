import { UsersRound, Home, BookOpenCheck, CalendarPlus, SmilePlus } from "lucide-react";
import Link from "next/link";

export default function SideLinks() {
    return (
        <section className="bg-royalBlue p-2 flex flex-col fixed m-r-5 w-20 h-full">
          <Link href={"/"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <CalendarPlus color="white"/>
          </Link>
          <Link href={"/"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <SmilePlus color="white"/>
          </Link>
          <Link href={"/"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <Home color="white"/>
          </Link>
          <Link href={"/patient"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <UsersRound color="white"/>
          </Link>
          <Link href={"/"}
          className="rounded-lg border border-transparent transition-colors p-5 hover:border-gray-300"
          >
            <BookOpenCheck color="white"/>
          </Link>
      </section>
    )
}
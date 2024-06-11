import Link from "next/link";
export default function SideLinks() {
    return (
        <section className="bg-royalBlue p-5 flex flex-col fixed w-20">
          <Link href={"/patients"}
          className="group rounded-lg border border-transparent p-5 transition-colors bg-royalBlue hover:border-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            Pacientes
          </Link>
      </section>
    )
}
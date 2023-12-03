import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-violet flex justify-center h-24 items-center">
      <div className="w-7xl">
        <Link href="/">
          <Image src="/logo.png" width={500} height={500} alt="logo" priority />
        </Link>
      </div>
    </nav>
  )
}

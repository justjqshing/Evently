
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className=" wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row ">
        <Link href="/">
          <Image src='/assets/images/logo.svg' width={128} height={38} alt="Logo"/>
        </Link>
        <p className="text-sm text-gray-500">© 2024 Evently</p>
      </div>
    </footer>
  )
}

export default Footer
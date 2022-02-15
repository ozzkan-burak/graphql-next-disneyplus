import Image from "next/image";
import Link from "next/link";
import logo from "../public/disney-logo.png";


const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <Image src={logo} alt="disney logo" width={90} height={50} />
      </Link>
    </nav>
  )
}

export default Navbar;
import Image from "next/image";
import Link from "next/link";
import logo from "../public/disney-logo.png";


const Navbar = ({account}) => {
  return (
    <nav>
      <Link href="/">
        <Image src={logo} alt="disney logo" width={90} height={50} />
      </Link>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} alt="avatar" />
      </div>
    </nav>
  )
}

export default Navbar;
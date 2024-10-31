import Link from "next/link";

const header = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        Ticketing
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {currentUser ? "SignOut" : "Sign in/out"}
        </ul>
      </div>
    </nav>
  );
};

export default header;

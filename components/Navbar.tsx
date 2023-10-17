import Image from "next/image";
import Link from "next/link";
import navStyles from "../styles/Navbar.module.css";
import { useRef, useState } from "react";
const Navbar = () => {
  const imageStyle = {
    width: "180px",
    height: "62px !important",
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChangeOfTabIndex = (idx: number) => {
    setActiveTabIndex(idx);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/candidates" className="">
          <Image
            src="/assets/images/SG_logo.svg"
            width={100}
            height={62}
            alt="Picture of the author"
            style={imageStyle}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ marginLeft: "72px" }}
        >
          <div className="navbar-nav">
            <Link
              href="/candidates"
              className={`nav-link mx-2 ${
                activeTabIndex === 0 ? navStyles.active : navStyles.inactive
              }`}
              onClick={() => handleChangeOfTabIndex(0)}
            >
              <span className={``}>Candidates</span>
            </Link>
            <Link
              href="/jobs"
              className={`nav-link mx-2 ${
                activeTabIndex === 1 ? navStyles.active : navStyles.inactive
              }`}
              onClick={() => handleChangeOfTabIndex(1)}
            >
              <span className={``}>Jobs</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

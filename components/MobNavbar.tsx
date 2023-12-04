// Import necessary modules and components
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/mobnavbar.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import LogoutAPI from '@/services/api/auth/logout';
import { clearToken } from '@/store/slices/token-slice';
import { clearMailID } from '@/store/slices/store-user-id';

const MobNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChangeOfTabIndex = (idx: number) => {
    setActiveTabIndex(idx);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    // Close the menu when a link is clicked (if needed)
    setMenuOpen(false);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const logoutUser = await LogoutAPI();
    if (logoutUser?.status === 200) {
      dispatch(clearToken());
      dispatch(clearMailID());
      router.push('/login');
    } else {
      toast.error('Something went wrong. Please try back in sometime', {
        autoClose: 5000, // Close the notification after 5 seconds
      });
    }
  };

  return (
    <>
      {/* Navbar container */}
      <nav className={`navbar navbar-light bg-light ${styles.mobNavbar}`}>
        <button
          className={`navbar-toggler ${styles.hamburger}`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="pe-2">
          <Link href="/" legacyBehavior>
            <a className={`navbar-brand ${styles.centeredLogo}`}>
              <Image
                src="/assets/images/SG_logo.svg"
                width={145}
                height={62}
                alt="Logo"
              />
            </a>
          </Link>
        </div>

        {/* Menu items   Offcanvas menu*/}
        <div
          className={`offcanvas offcanvas-start ${menuOpen ? 'show' : ''}`}
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header d-flex justify-content-end">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={toggleMenu}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className={styles.nav_item}>
                <Link
                  href="/jobs"
                  className={` ${
                    router.pathname === '/jobs'
                      ? styles.active
                      : styles.inactive
                  }`}
                >
                  <span className={styles.nav_link} onClick={handleLinkClick}>
                    Jobs
                  </span>
                </Link>
              </li>
              <li className={styles.nav_item}>
                <Link
                  href="/candidates"
                  className={`${
                    router.pathname === '/candidates'
                      ? styles.active
                      : styles.inactive
                  }`}
                >
                  <span className={styles.nav_link} onClick={handleLinkClick}>
                    Candidates
                  </span>
                </Link>
              </li>
              <li className={styles.nav_item}>You have no job postings</li>
              <li className={styles.nav_item}>
                <a href="#" className={styles.nav_link}>
                  Create Job Posting
                </a>
              </li>
            </ul>

            <div className={` ${styles.logout_wrapper}`}>
              <button
                className="btn btn-primary logout-btn"
                onClick={() => handleLogout()}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <div className="text-end pe-2">
          <button className={styles.create_btn}>Create job posting</button>
        </div>
      </div>
    </>
  );
};

export default MobNavbar;

import Image from 'next/image';
import Link from 'next/link';
import navStyles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LogoutAPI from '@/services/api/auth/logout';
import { clearToken } from '@/store/slices/token-slice';
import { useDispatch } from 'react-redux';
import { clearMailID } from '@/store/slices/store-user-id';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
  const dispatch = useDispatch();
  const imageStyle = {
    width: '180px',
    height: '62px !important',
  };

  const router = useRouter();
  console.log(router, 'router23');

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChangeOfTabIndex = (idx: number) => {
    setActiveTabIndex(idx);
  };

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-padding">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="offcanvas"
          data-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          // aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <Link href="/candidates" className={styles.sg_logo_mob}>
          <Image
            src="/assets/images/SG_logo.svg"
            width={100}
            height={62}
            alt="Picture of the author"
            style={imageStyle}
          />
        </Link>

        <div
          className="collapse navbar-collapse "
          id="navbarNavAltMarkup"
          style={{ marginLeft: '72px' }}
        >
          <div className="navbar-nav">
            <Link
              href="/candidates"
              className={`nav-link mx-2 ${
                router.pathname === '/candidates'
                  ? navStyles.active
                  : navStyles.inactive
              }`}
              onClick={() => handleChangeOfTabIndex(0)}
            >
              <span className={``}>Candidates</span>
            </Link>
            <Link
              href="/jobs"
              className={`nav-link mx-2 ${
                router.pathname === '/jobs'
                  ? navStyles.active
                  : navStyles.inactive
              }`}
              onClick={() => handleChangeOfTabIndex(1)}
            >
              <span className={``}>Jobs</span>
            </Link>
          </div>
        </div>

        <div>
          <button
            className="btn btn-primary mr-3"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
        {/* 
        <div>
          {router.pathname === '/candidates' ? (
            <Link href="/new-job-applicant" className={styles.create_btn}>
              Create Job Applicant{' '}
            </Link>
          ) : router.pathname === '/jobs' ? (
            <Link href="/create-job-opening" className={styles.create_btn}>
              Create Job Opening
            </Link>
          ) : (
            ''
          )}
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;

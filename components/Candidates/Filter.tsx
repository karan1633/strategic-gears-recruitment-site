import LogoutAPI from '@/services/api/auth/logout';
import { clearMailID } from '@/store/slices/store-user-id';
import { clearToken } from '@/store/slices/token-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styles from '../../styles/vertical-tabs.module.css';
const Filter = () => {
  // const [tableState, setTableState] = useState([{id:1,net_wt:"", gross_wt:"", kundan_wt:""}]);
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
    <div className={styles.jobposting_filter}>
      {/* <p
        className={`d-flex justify-content-center align-items-center ${styles.jobposting_filter}`}
      >
        You have no job postings
      </p>
      <a href="#" className="d-flex justify-content-center align-items-center">
        Create Job Posting
      </a> */}

      <div className="d-flex justify-content-center">
        {/* <div className={` ${styles.logout_wrapper}`}>
          <button
            className="btn btn-primary logout-btn"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Filter;

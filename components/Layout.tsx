import MobNavbar from './MobNavbar';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Layout = ({ children }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  // console.log("router", router);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* {router.asPath !== '/login' && <MobNavbar />} */}
      {router.asPath !== '/login' && (isMobile ? <MobNavbar /> : <Navbar />)}
      {children}
    </>
  );
};

export default Layout;

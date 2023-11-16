import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }: any) => {
  const router = useRouter();
  // console.log("router", router);
  return (
    <>
      {router.asPath !== '/login' && <Navbar />}
      {children}
    </>
  );
};

export default Layout;

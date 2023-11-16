import Image from 'next/image';
import NoDataImg from '../public/assets/images/no_data_found.jpg';

const NoData = () => {
  console.log('bo data');
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#FFF' }}
    >
      <Image
        src={NoDataImg}
        width={600}
        height={600}
        alt="Strategic Gears Data"
      />
    </div>
  );
};

export default NoData;

import React from 'react';
// import { FadeLoader } from 'react-loader-spinner';
import { FadeLoader} from 'react-spinners';

function Loader() {
  return (
    <div style={styles.loaderContainer}>
      <FadeLoader color="#36d7b7" />
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',      // full viewport height, centers vertically
    backgroundColor: '#f0f0f0',  // light background (optional)
  },
};

export default Loader;

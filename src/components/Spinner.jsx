import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto'
    // position: 'absolute',
    // top: '50%',
    // left: '50%'
};

const Spinner = ({ loading }) => {
    return (
        <ClipLoader
            color="#4338ca"
            loading={loading}
            cssOverride={override}
            size={75}
        />
    );
};

export default Spinner;

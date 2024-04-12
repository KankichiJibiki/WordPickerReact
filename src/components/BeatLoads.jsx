import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const BeatLoads = ({ loading }) => {
    return (
        <BeatLoader
            color='#36d7b7'
            loading={ loading }
        />
    )
}

export default BeatLoads
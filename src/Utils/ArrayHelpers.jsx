const ArrayHelpers = () => {
    const assoArrToArrayVal = (assoArr) => {
        const toArray = [];

        assoArr.map((value) => {
            toArray.push(Object.values(value)[0]);
        });

        return toArray;
    };

    return { assoArrToArrayVal };
};

export default ArrayHelpers;

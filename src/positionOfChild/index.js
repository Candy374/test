/**
 * Created by huangling on 16/12/2017.
 */
const findRightPlace = (i, count, length = 1) => {
    if (count === 1) {
        return 0.5 * length;
    } else {
        return  (i / (count - 1)) * length;
    }
};


export default findRightPlace;
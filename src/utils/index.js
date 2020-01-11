
//grid styling of elements of the home page
export function getClass(i) {
    if (i % 20 === 0) {
        return 'wide'
    }

    else if (i % 5 === 0) {
        return 'big';
    }
    else if (i % 6 === 0) {
        return 'wide'
    }

}
export function removeDuplicated(arr, key) {
    const filteredArr = arr.reduce((acc, current) => {
        const x = acc.find(item => item[key] === current[key]);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    return filteredArr;
}

export function makeid(length) {
    let result = '';
    const characters = '12345';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

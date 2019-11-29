const hash1 = '$2y$12$AKB.faAUp5VfVqGIP3C.eOsujJSivY7uGtfRXtznH7f8qVZoLPvXW';
const hash2 = '$2y$12$H3miSCY2QQjp8D/eTHKJoOS.MxY.fnQ0goyEW0yUK6SaXLbJDSa5e';
let currentHash = hash1;
module.exports = {
    hash: () => {
        currentHash = currentHash === hash1 ? hash2 : hash1;

        return Promise.resolve(currentHash);
    },
};

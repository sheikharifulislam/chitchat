const pipe =
    (...fns) =>
    (data) =>
        fns.reduce((acc, cur) => cur(acc), data);

module.exports = pipe;

module.exports = function (n, block) {
    let accum = "";
    for (let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
};

/*

{{#loop 6}}
    <span>{{this}}</span>
{{/loop}}

*/

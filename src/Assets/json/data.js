import * as functions from '../../helper/functions';

export const links = [
    {source: 27, target: 28},
    {source: 28, target: 27},
    {source: 28, target: 12},
    {source: 47, target: 46},
    {source: 41, target: 37},
    {source: 41, target: 25},
    {source: 27, target: 11},
    {source: 38, target: 2},
    {source: 28, target: 41},
    {source: 28, target: 0},
    {source: 13, target: 21},
    {source: 46, target: 25},
    {source: 39, target: 41},
    {source: 21, target: 1},
    {source: 1, target: 28},
    {source: 14, target: 16},
    {source: 28, target: 1},
    {source: 28, target: 23},
    {source: 21, target: 20},
    {source: 32, target: 5},
    {source: 28, target: 21},
    {source: 38, target: 43},
    {source: 2, target: 35},
    {source: 31, target: 38},
    {source: 22, target: 45},
    {source: 37, target: 41},
    {source: 20, target: 21},
    {source: 0, target: 11},
    {source: 13, target: 2},
    {source: 25, target: 46},
    {source: 1, target: 21},
    {source: 27, target: 0},
    {source: 23, target: 28},
    {source: 21, target: 13},
    {source: 1, target: 41},
    {source: 25, target: 13},
    {source: 12, target: 35},
    {source: 35, target: 12},
    {source: 12, target: 28},
    {source: 31, target: 43},
    {source: 0, target: 27},
    {source: 16, target: 14},
    {source: 0, target: 28},
    {source: 43, target: 38},
    {source: 41, target: 12},
    {source: 0, target: 12},
    {source: 35, target: 2},
    {source: 34, target: 48},
    {source: 11, target: 27},
    {source: 25, target: 2},
    {source: 20, target: 2},
    {source: 28, target: 2},
    {source: 38, target: 31},
    {source: 45, target: 22},
    {source: 19, target: 42},
    {source: 2, target: 38},
    {source: 13, target: 25},
    {source: 41, target: 39},
    {source: 2, target: 13},
    {source: 41, target: 1},
    {source: 3, target: 19},
    {source: 46, target: 47},
    {source: 25, target: 41},
    {source: 2, target: 31},
    {source: 21, target: 28},
    {source: 11, target: 29},
    {source: 12, target: 41},
    {source: 48, target: 34},
    {source: 37, target: 25},
    {source: 43, target: 31},
    {source: 29, target: 11},
    {source: 31, target: 2},
    {source: 2, target: 28},
    {source: 28, target: 20},
    {source: 5, target: 32},
    {source: 2, target: 20},
    {source: 27, target: 41},
    {source: 41, target: 27},
    {source: 2, target: 25},
    {source: 42, target: 19},
    {source: 20, target: 28},
    {source: 12, target: 0},
    {source: 41, target: 28},
    {source: 25, target: 37},
    {source: 19, target: 3},
    {source: 11, target: 0}
];

const nodes = [...Array(1000000).keys()].map((el) => {
    return {
        id: functions.makeid(4),
        group: functions.makeid(1)
    }
});

export const miserables =
    {
        "nodes": functions.removeDuplicated(nodes, 'id'),
        "links": [...Array(1000).keys()].map((el) => {
            return {
                source: functions.makeid(4),
                target: functions.makeid(4),
                value: functions.makeid(1)
            }
        })
    };

console.log(miserables);
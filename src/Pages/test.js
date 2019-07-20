import React, {Component} from 'react';

export default class Test extends Component {
    makeid(length) {
        var result = '';
        var characters = '123';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
        return o;
    };

    componentDidMount() {
        const array1 = [...Array(5).keys()].map((el) => {
            return {
                group: 'nodes',
                data: {id: this.makeid(4)}
            }
        });

        const array2 = [...Array(5).keys()].map((el) => {
            return {
                group: 'edges',
                data: {
                    id: 'edge6',
                    source: this.makeid(4),
                    target: this.makeid(4)
                }
            }
        });

        const random = this.shuffle([1, 2, 3, 4]);
        this.removeDuplicated();
    }

    removeDuplicated() {
        // const array = [{a: 1}, {a: 2}, {a: 4}, {a: 7}];
        // console.log(array);
        // const jobsUniqu = array.filter(function (item, index) {
        //     return array.findIndex(a => a.a) >= index;
        // });
        // console.log('Job ::: ', jobsUniqu);
        const arr = [
            {id: 1, name: "test1"},
            {id: 2, name: "test2"},
            {id: 2, name: "test3"},
            {id: 3, name: "test4"},
            {id: 4, name: "test5"},
            {id: 5, name: "test6"},
            {id: 5, name: "test7"},
            {id: 6, name: "test8"}
        ];
        const filteredArr = arr.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

    }

    render() {
        return (
            <div>
                Test
            </div>
        )
    }
}
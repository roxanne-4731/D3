import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import '../Styles/Cytoscape.css';

export default class Cytoscape extends Component {
    makeid(length) {
        var result = '';
        var characters = '123';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    componentDidMount() {
        let cy = cytoscape({
            container: document.getElementById('cy'),  // container to render in
            elements: [...Array(1000).keys()].map((el) => {
                return {
                    group: 'nodes',
                    data: {id: this.makeid(3)}
                }
            }).concat([...Array(100).keys()].map((el) => {
                return {
                    group: 'edges',
                    data: {
                        id: 'edges' + Math.random(),
                        source: this.makeid(3),
                        target: this.makeid(3)
                    }
                }
            })),
            style: cytoscape.stylesheet()
            // style for the nodes
                .selector('node')
                .css({
                    'width': '1em',
                    'height': '1em',
                    'content': 'data(id)',
                    'text-align': 'center',
                    'color': '#fff',
                    // 'text-outline-width': 2,
                    // 'background-color': '#591528',
                    'background-color': '#C13E3E',


                    'z-index': 1,
                    'font-family': 'Oswald',
                    'font-color': '#fff'
                    // 'font-size': '12px',
                    // 'text-outline-color ': '#fafafa'
                })

                // style for the connecting lines
                .selector('edge')
                .css({
                    'width': .5,
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'target-arrow-color': '#F3A712',
                    'line-color': '#F0CEA0',
                    // 'line-color': '#C40E0E',

                    'z-index': -1

                })
                .selector(':selected')
                .css({
                    'background-color': 'black',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                })
                .selector('.faded')
                .css({
                    'opacity': 0.25,
                    'text-opacity': 0
                }),


            layout: {
                name: 'grid',
                rows: 1
            }
        });
        let layout = cy.elements().layout({
            name: 'random'
        });

        layout.run();
    }

    render() {
        return (
            <div>
                <div id="cy"/>
            </div>
        );
    }
}
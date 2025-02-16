import React, {Component} from 'react';
import * as d3 from 'd3';
import '../../assets/styles/D3Three.css';

export default class exampleThree extends Component {
    componentDidMount() {
        // Configure graphics
        let width = 1000,
            height = 800;

        let circleWidth = 5,
            charge = -75;
            // gravity = 0.1;

        let palette = {
            "lightgray": "#D9DEDE",
            "gray": "#C3C8C8",
            "mediumgray": "#536870",
            "orange": "#BD3613",
            "purple": "#595AB7",
            "yellowgreen": "#738A05"
        };

        // Generate test data
        let nodes = [];
        let numNodes = 200;
        for (let x = 0; x < numNodes; x++) {
            let targetAry = [];
            let connections = (Math.round(Math.random() * 5));
            for (let y = 0; y < connections; y++) {
                targetAry.push(Math.round(Math.random() * numNodes))
            }
            nodes.push({
                id: x,
                name: "Node " + x,
                target: targetAry
            })
        }
        // Create the links array from the generated data
        let links = [];
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].target !== undefined) {
                for (let j = 0; j < nodes[i].target.length; j++) {
                    links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[j]]
                    })
                }
            }
        }
        // Create SVG
        let fdGraph = d3.select('#graphic')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // Create the force layout to calculate and animate node spacing
        const forceX = d3.forceX(width);
        const forceY = d3.forceY(height);

        let forceLayout = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('x', forceX)
            .force('y', forceY);


        // Create the SVG lines for the links
        let link = fdGraph
            .selectAll('line').data(links).enter()
            .append('line')
            .attr('stroke', palette.gray)
            .attr('stroke-width', 1)
            .attr('class', function (d, i) {
                // Add classes to lines to identify their from's and to's
                let theClass = 'line_' + d.source.id + ' line';
                if (d.target !== undefined) {
                    theClass += ' to_' + d.target.id
                }
                return theClass
            });

        // Create the SVG groups for the nodes and their labels
        let node = fdGraph
            .selectAll('circle')
            .data(nodes).enter()
            .append('g')
            .attr('id', function (d) {
                return 'node_' + d.id
            })
            .attr('class', 'node')
            .on('mouseover', function (d) {
                // When mousing over a node, make the label bigger and bold
                // and revert any previously enlarged text to normal
                d3.selectAll('.node').selectAll('text')
                    .attr('font-size', '12')
                    .attr('font-weight', 'normal');
                //
                //     // Highlight the current node
                d3.select(this).select('text')
                    .attr('font-size', '16')
                    .attr('font-weight', 'bold');
                //
                //     // Hightlight the nodes that the current node connects to
                for (let i = 0; i < d.target.length; i++) {
                    d3.select('#node_' + d.target[i]).select('text')
                        .attr('font-size', '14')
                        .attr('font-weight', 'bold')
                }
                //
                //     // Reset and fade-out the unrelated links
                d3.selectAll('.line')
                    .attr('stroke', palette.lightgray)
                    .attr('stroke-width', 1);
                //
                for (let x = 0; x < links.length; x++) {
                    if (links[x].target !== undefined) {
                        if (links[x].target.id === d.id) {
                            // Highlight the connections to this node
                            d3.selectAll('.to_' + links[x].target.id)
                                .attr('stroke', palette.orange)
                                .attr('stroke-width', 2);
                            //
                            //                 // Highlight the nodes connected to this one
                            d3.select('#node_' + links[x].source.id).select('text')
                                .attr('font-size', '14')
                                .attr('font-weight', 'bold')
                        }
                    }
                }
                // Highlight the connections from this node
                d3.selectAll('.line_' + d.id)
                    .attr('stroke', palette.purple)
                    .attr('stroke-width', 3);
                // When mousing over a node,
                // make it more repulsive so it stands out

                // forceLayout.force('charge',  (d2, i) => {
                //     if (d2 !== d) {
                //
                //         // Make the nodes connected to more repulsive
                //         for(let i = 0; i < d.target.length; i++) {
                //             if(d2.id === d.target[i]) {
                //                 return charge * 8
                //             }
                //         }
                //
                //         // Make the nodes connected from more repulsive
                //         for(let x = 0; x < links.length; x++) {
                //             if(links[x].source.id === d2.id) {
                //                 if(links[x].target !== undefined) {
                //                     if(links[x].target.id === d.id) {
                //                         return charge * 8
                //                     }
                //                 }
                //             }
                //         }
                //
                //         // Reset unrelated nodes
                //         return charge;
                //
                //     } else {
                //         // Make the selected node more repulsive
                //         return charge * 10;
                //     }
                // });
            });

        // Create the SVG circles for the nodes
        node.append('circle')
            .attr('cx', function (d) {
                return d.x
            })
            .attr('cy', function (d) {
                return d.y
            })
            .attr('r', circleWidth)
            .attr('fill', function (d, i) {
                // Color 1/3 of the nodes each color
                // Depending on the data, this can be made more meaningful
                if (i < (numNodes / 3)) {
                    return palette.orange
                } else if (i < (numNodes - (numNodes / 3))) {
                    return palette.purple
                }
                return palette.yellowgreen
            });

        // Create the SVG text to label the nodes
        node.append('text')
            .text(function (d) {
                return d.name
            })
            .attr('font-size', '12');

        // Animate the layout every time tick
        forceLayout.on('tick', function (e) {
            // Move the nodes base on charge and gravity
            node.attr('transform', function (d, i) {
                return 'translate(' + d.x + ', ' + d.y + ')'
            });

            // Adjust the lines to the new node positions
            link
                .attr('x1', function (d) {
                    return d.source.x
                })
                .attr('y1', function (d) {
                    return d.source.y
                })
                .attr('x2', function (d) {
                    if (d.target !== undefined) {
                        return d.target.x
                    } else {
                        return d.source.x
                    }
                })
                .attr('y2', function (d) {
                    if (d.target !== undefined) {
                        return d.target.y
                    } else {
                        return d.source.y
                    }
                })
        });

        // Start the initial layout
        // forceLayout.start();

    }

    render() {
        return (
            <div className="container">
                <div id="graphic"/>
            </div>
        );
    }
}
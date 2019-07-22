import React, {Component} from 'react';
import * as d3 from 'd3';
import '../../Styles/D3Five.css';
import {custom} from '../../Assets/json/data';

export default class Example5 extends Component {

    componentDidMount() {
        // Select svg and it's height and width
        const graphic = d3.select("svg"),
            width = +graphic.attr("width"),
            height = +graphic.attr("height");

        const simulation = d3.forceSimulation(custom.nodes)
            .force("charge", d3.forceManyBody().strength(-20))
            .force("link", d3.forceLink(custom.links).id(function (d) {
                return d.id
            }).distance(200))
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .on("tick", ticked);

        const dragStart = d => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const drag = d => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragEnd = d => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };

        const link = graphic.selectAll(".link")
            .data(custom.links)
            .enter().append("line")
            .attr("class", "link")
            .attr('stroke', '#E5E5E5');

        const node = graphic.selectAll(".node")
            .data(custom.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("cx", function (d) {
                return d.x
            })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", 4)
            .style("fill", function (d) {
                return d.id
            })
            .on('click', selectNode)
            .call(d3.drag()
                .on('start', dragStart)
                .on('drag', drag)
                .on('end', dragEnd));

        const textElements = graphic.append('g')
            .selectAll('text')
            .data(custom.nodes)
            .enter().append('text')
            .text(node => node.label)
            .attr('font-size', 10)
            .attr('dx', 15)
            .attr('dy', 4);

        node.append("title")
            .text(function (d) {
                return d.name;
            });

        graphic.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            .on("zoom", zoomed));

        function ticked() {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
            textElements
                .attr('x', function (d) {
                    return d.x
                }).attr('y', function (d) {
                return d.y;
            })
        }

        function zoomed() {
            node.attr("transform", d3.event.transform);
            link.attr("transform", d3.event.transform);
            textElements.attr('transform', d3.event.transform)
        }

        function getNeighbors(node) {
            return custom.links.reduce((neighbors, link) => {
                if (link.target.id === node.id) {
                    neighbors.push(link.source.id)
                } else if (link.source.id === node.id) {
                    neighbors.push(link.target.id)
                }
                return neighbors
            }, [node.id])
        }

        function isNeighborLink(node, link) {
            return link.target.id === node.id || link.source.id === node.id
        }

        function getNodeColor(node, neighbors) {
            if (neighbors.indexOf(node.id)) {
                return node.level === 1 ? 'blue' : 'green'
            }
            return node.level === 1 ? 'red' : 'gray'
        }

        function getTextColor(node, neighbors) {
            return neighbors.indexOf(node.id) ? 'green' : 'black'
        }

        function getLinkColor(node, link) {
            return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
        }

        function selectNode(selectedNode) {
            const neighbors = getNeighbors(selectedNode);
            node
                .attr('fill', node => getNodeColor(node, neighbors));
            textElements
                .attr('fill', node => getTextColor(node, neighbors));
            link
                .attr('stroke', link => getLinkColor(selectedNode, link));
        }

    }

    render() {
        return (
            <div className="container">
                <svg className="d3-graphic" width="960" height="500" ref="d3Graphic"/>
            </div>
        )
    }
}
import React, {Component} from 'react';
import * as d3 from 'd3';
import '../Styles/D3Five.css';

export default class Example5 extends Component {
    componentDidMount() {
        const margin = {top: -5, right: -5, bottom: -5, left: -5};

        const data = {
            nodes: [{id: 1, name: 'CSS', group: 1}, {id: 2, name: 'HTML', group: 1}, {
                id: 3,
                name: 'JS',
                group: 1
            }, {id: 4, name: 'SCSS', group: 2}],
            links: [{source: 1, target: 2}, {source: 1, target: 3}, {source: 2, target: 3}, {source: 4, target: 2}]
        };

        let zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        let graphic = d3.select("svg")
            .style("color", "black")
            .style("background-color", "white")
            .attr("width", 800)
            .attr("height", 800)
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
            .call(zoom);
        // const tooltip = d3.select('.container')
        //     .append('div')
        //     .attr('class', 'tooltip')
        //     .html('Tooltip');

        let simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody().strength(-200))
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }).distance(40))
            .force("x", d3.forceX(800 / 2))
            .force("y", d3.forceY(800 / 2))
            .on("tick", ticked);

        let link = graphic.selectAll(".link"),
            node = graphic.selectAll(".node");

        simulation.nodes(data.nodes);
        simulation.force("link").links(data.links);

        link = link
            .data(data.links)
            .enter().append("line")
            .attr("class", "link");

        node = node
            .data(data.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 6)
            .style("fill", function (d) {
                return d.id;
            }).on('mouseover', d => {
                console.log(d.name);
                // tooltip.html(d.country)
                //     .style('left', d3.event.pageX + 5 + 'px')
                //     .style('top', d3.event.pageY + 5 + 'px')
                //     .style('opacity', .9);
            });

        node.append("title")
            .text(function (d) {
                return d.name;
            });

        function ticked() {

            link.attr("x1", function (d) {
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

            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        function zoomed() {
            graphic.attr("transform", d3.event.transform);
        }
    }

    render() {
        return (
            <div className="container">
                <svg className="d3-graphic" ref="d3Graphic"/>
            </div>
        )
    }
}
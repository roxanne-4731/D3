import React, {Component} from 'react';
import * as d3 from 'd3';
import '../../assets/styles/D3Six.css'

export default class Collapsible extends Component {
    componentDidMount() {
        let width = 960,
            height = 500,
            root;

        let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

        let link = svg.selectAll(".link"),
            node = svg.selectAll(".node");

        d3.json("d.json", function (error, json) {
            if (error) throw error;
        }).then((res) => {
            root = res;
            update();
        }).catch((err) => {

        });

        function update() {
            let nodes = flatten(root),
                treeRoot = d3.hierarchy(root),
                links = treeRoot.links();
            // Restart the force layout.
            let links2 = links.map((item) => {
                setTimeout(() => {
                    for (let [key, value] of Object.entries(item.target.data)) {
                        item.target.key = value;
                    }
                    for (let [key, value] of Object.entries(item.source.data)) {
                        item.source.key = value;
                    }
                }, 0);
            });

            async function test(array) {
                return await Promise.all(
                    links.map((item) => {
                        setTimeout(() => {
                            for (let [key, value] of Object.entries(item.target.data)) {
                                item.target.key = value;
                            }
                            for (let [key, value] of Object.entries(item.source.data)) {
                                item.source.key = value;
                            }
                            return item;
                        }, 0);
                    })
                )
            }

            let force = d3.forceSimulation(nodes)
                .force("charge", d3.forceManyBody().strength(-20))
                .force("x", d3.forceX(width / 2))
                .force("y", d3.forceY(height / 2))
                .force('link', d3.forceLink(links))
                .on("tick", tick)
            ;


            // Update the links…
            link = link.data(links, function (d) {
                return d.target.data.id;
            });

            // Exit any old links.
            link.exit().remove();

            // Enter any new links.
            link.enter().insert("line", ".node")
                .attr("class", "link")
                .attr("x1", function (d) {
                    return d.source.data.x;
                })
                .attr("y1", function (d) {
                    return d.source.data.y;
                })
                .attr("x2", function (d) {
                    return d.target.data.x;
                })
                .attr("y2", function (d) {
                    return d.target.data.y;
                });

            // Update the nodes…
            node = node.data(nodes, function (d) {
                return d.id;
            }).style("fill", color);

            // Exit any old nodes.
            node.exit().remove();

            // Enter any new nodes.
            node.enter().append("circle")
                .attr("class", "node")
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                })
                .attr("r", function (d) {
                    return Math.sqrt(d.size) / 10 || 4.5;
                })
                .style("fill", color)
                .on("click", click)
                .call(force.drag);
        }

        function tick() {
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

// Color leaf nodes orange, and packages white or blue.
        function color(d) {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }

// Toggle children on click.
        function click(d) {
            if (!d3.event.defaultPrevented) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update();
            }
        }

// Returns a list of all nodes under the root.
        function flatten(root) {
            let nodes = [], i = 0;

            function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                if (!node.id) node.id = ++i;
                nodes.push(node);
            }

            recurse(root);
            return nodes;
        }
    }

    render() {
        return (
            <div className="container">
                <svg/>
            </div>
        )
    }
};
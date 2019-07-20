import React, {Component} from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import '../../Styles/D3.css';

export default class App extends Component {
    state = {
        loading: false,
        selectedLink: []
    };

    componentDidMount() {
        this.renderNetwork(this.callbackFunction).then((data) => {
            const width = 900,
                height = 1000;

            //Initializing chart
            const chart = d3.select('.chart')
                .attr('width', width)
                .attr('height', height);

            //Creating tooltip
            const tooltip = d3.select('.container')
                .append('div')
                .attr('class', 'tooltip')
                .html('Tooltip');
            //Initializing force simulation
            const simulation = d3.forceSimulation()
                .force('link', d3.forceLink())
                .force('charge', d3.forceManyBody())
                .force('collide', d3.forceCollide())
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force("y", d3.forceY(0))
                .force("x", d3.forceX(0));

            //Drag functions
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

            //Creating links
            const link = chart.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(data.links).enter()
                .append('line');
            //Creating Text
            const text = chart.append('g')
                .attr('class', 'texts')
                .attr("x", 8)
                .attr("y", ".20em")
                .attr("fill", 'black')
                .selectAll('text')
                .data(data.nodes).enter()
                .append('text')
                .text(function (d) {
                    return d.country
                });
            //Creating nodes
            const node = d3.select('.chartContainer')
                .selectAll('div')
                .data(data.nodes).enter()
                .append('div')
                .attr('class', d => {
                    return 'flag flag-' + d.code;
                })
                .call(d3.drag()
                    .on('start', dragStart)
                    .on('drag', drag)
                    .on('end', dragEnd)
                ).on('mouseover', d => {
                    tooltip.html(d.country)
                        .style('left', d3.event.pageX + 5 + 'px')
                        .style('top', d3.event.pageY + 5 + 'px')
                        .style('opacity', .9);
                }).on('mouseout', () => {
                    tooltip.style('opacity', 0)
                        .style('left', '0px')
                        .style('top', '0px');
                }).on('click', d => {
                    console.log('click event ::: ', d);
                });

            //Setting location when ticked
            const ticked = () => {
                link
                    .attr("x1", d => {
                        return d.source.x;
                    })
                    .attr("y1", d => {
                        return d.source.y;
                    })
                    .attr("x2", d => {
                        return d.target.x;
                    })
                    .attr("y2", d => {
                        return d.target.y;
                    });
                text.attr("transform", transform);
                node.attr("style", d => {
                    return 'left: ' + (d.x - 5) + 'px; top: ' + (d.y + 95) + 'px';
                });
            };

            function transform(d) {
                return "translate(" + d.x + "," + d.y + ")";
            }

            //Starting simulation
            simulation.nodes(data.nodes)
                .on('tick', ticked);
            simulation.force('link')
                .links(data.links);
        }).catch((error) => {
            console.log('error in fetching data ::: ', error);
        })
    }

    renderNetwork(callback) {
        return new Promise((resolve, reject) => {
            const url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
            axios.get(url).then((res) => {
                this.setState({loading: true});
                resolve(res.data);
                callback(this, res.data);
            }).catch((error) => {
                this.setState({loading: true});
                reject(error);
            });

        });

    };

    callbackFunction(that, data) {
        let selectedLink = [];
        data.links.forEach((item) => {
            setTimeout(() => {
                if (item.target.country === 'Suriname') {
                    selectedLink.push(item);
                    that.setState({selectedLink});
                }
            }, 0);
        });
    }

    render() {

        return (
                <div className='container'>
                    <svg className='chart'/>
                </div>
        );
    }
}
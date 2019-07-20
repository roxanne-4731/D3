import React, {Component} from 'react';
import * as d3 from 'd3';
import {miserables} from '../Assets/json/data';
import '../Styles/D3Two.css';

export default class exampleTwo extends Component {
    componentDidMount() {
        const canvas = d3.select("canvas").call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom)),
            context = canvas.node().getContext("2d"),
            width = canvas.property("width"),
            height = canvas.property("height");

        const randomX = d3.randomNormal(width / 2, 80),
            randomY = d3.randomNormal(height / 2, 80),
            data = d3.range(2000).map(function () {
                return [randomX(), randomY()];
            });
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter());

        simulation
            .nodes(miserables.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(miserables.links);

        function ticked() {
            context.clearRect(0, 0, width, height);
            context.save();
            context.translate(width / 2, height / 2 + 40);

            context.beginPath();
            miserables.links.forEach(drawLink);
            context.strokeStyle = "#aaa";
            context.stroke();

            context.beginPath();
            miserables.nodes.forEach(drawNode);
            context.fill();
            context.strokeStyle = "#fff";
            context.stroke();

            context.restore();
        };

        function drawLink(d) {
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
        }

        function drawNode(d) {
            context.moveTo(d.x + 3, d.y);
            context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
        }

        function zoom() {
            const transform = d3.event.transform;
            context.save();
            context.clearRect(0, 0, width, height);
            context.translate(transform.x, transform.y);
            context.scale(transform.k, transform.k);
            draw();
            context.restore();
        }

        function draw() {
            let i = -1, n = data.length, d;
            context.beginPath();
            while (++i < n) {
                d = data[i];
                context.moveTo(d[0], d[1]);
                context.arc(d[0], d[1], 2.5, 0, 2 * Math.PI);
            }
            context.fill();
        }
    }

    render() {
        return (
            <div className="container">
                < canvas width={900} height={500}/>
            </div>
        );
    }
}
import * as d3 from "d3";

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
        .call(zoom),
    width = +graphic.attr("width"),
    height = +graphic.attr("height");

let simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-200))
    .force("link", d3.forceLink().id(function (d) {
        return d.id;
    }).distance(40))
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
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
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 2.5)
    .style("fill", function (d) {
        return d.id;
    }).on('mouseover', d => {
        console.log(d.name);
    })
    .call(d3.drag()
        .on("drag", dragged));

graphic.call(d3.zoom()
    .scaleExtent([1 / 2, 8])
    .on("zoom", zoomed));

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

graphic.call(d3.zoom()
    .scaleExtent([1 / 2, 8])
    .on("zoom", zoomed));

function zoomed() {
    node.attr("transform", d3.event.transform);
    link.attr("transform", d3.event.transform);
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}
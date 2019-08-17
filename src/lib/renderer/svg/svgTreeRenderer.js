import * as d3 from "d3";

export class SvgTree {

    node;
    link;
    root;
    i = 0;
    svg;
    force;

    constructor(children, force, svg) {
        this.force = force;
        this.svg = svg;
        this.root = d3.hierarchy(children);
    }

    renderTree(selector) {
        const width = 960,
            height = 500;

        this.svg = d3.select(selector).append("svg")
            .append('g')
            .call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', (d) => this.zoomed(d)))
            .attr('transform', 'translate(40,0)');

        this.force = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(-15).distanceMax(300))
            .force('link', d3.forceLink().id(function (d) {
                return d.id;
            }))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on("tick", () => {
                this.tick()
            });

        this.update();
    };

    update() {
        const nodes = this.flatten(this.root);
        const links = this.root.links();



        this.link = this.svg
            .selectAll('.link')
            .data(links, function (d) {
                return d.target.id
            });

        this.link.exit().remove();

        const linkEnter = this.link
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', '#000')
            .style('opacity', '0.2')
            .style('stroke-width', 2);

        this.link = linkEnter.merge(this.link);

        this.node = this.svg
            .selectAll('.node')
            .data(nodes, function (d) {
                return d.id
            });

        this.node.exit().remove();

        const nodeEnter = this.node
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('stroke', '#666')
            .attr('stroke-width', 2)
            .style('fill', this.color)
            .style('opacity', 1)
            .on('click', (d) => this.click(d))
            .call(d3.drag()
                .on('start', (d) => this.dragstarted(d))
                .on('drag', (d) => this.dragged(d))
                .on('end', (d) => this.dragended(d)));

        nodeEnter.append('circle')
            .attr("r", function (d) {
                return Math.sqrt(d.data.size) / 10 || 4.5;
            })
            .style('text-anchor', function (d) {
                return d.children ? 'end' : 'start';
            })
            .text(function (d) {
                return d.data.name
            });

        this.node = nodeEnter.merge(this.node);
        this.force.nodes(nodes);
        this.force.force('link').links(links);
    }

    tick() {
        this.link
            .attr('x1', function (d) {
                return d.source.x;
            })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            });

        this.node
            .attr('transform', function (d) {
                return `translate(${d.x}, ${d.y})`
            });
    }

    flatten(root) {

        const nodes = [];
        const that = this;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++that.i;
            else ++that.i;
            nodes.push(node)
        }

        recurse(root);
        return nodes
    }

    dragstarted(d) {
        if (!d3.event.active) this.force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) this.force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    zoomed() {
        this.svg.attr('transform', d3.event.transform)
    }

    color(d) {
        return d._children ? "#51A1DC" // collapsed package
            : d.children ? "#51A1DC" // expanded package
                : "#F94B4C"; // leaf node
    }


    click(d) {
        if (!d3.event.defaultPrevented) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update()
        }
    }
}

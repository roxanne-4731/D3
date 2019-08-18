import * as d3 from "d3";

export default class Links {
    links;
    #linkLabel;
    #simulation;
    styles = {
        links: [],
        linkLabel: [],
        fontSize: 10,
        fontColor: '#000',
    };

    constructor(graph, simulation) {

        this.links = graph
            .selectAll(".link");

        this.#linkLabel = graph.selectAll(".edgelabel");
        this.#simulation = simulation;
        this.setStyle();
    }

    setLinks(graph) {
        this.links = graph
            .selectAll('.link');
        this.#linkLabel = graph.selectAll(".edgelabel");
        this.setStyle();
    }

    setClass(className) {
        this.links.attr("class", className);
    }


    setStyle() {
        const {links, linkLabel, fontSize, fontColor} = this.styles;
        links.forEach((linkStyle, index) => {
            this.links.attr(linkStyle.name, linkStyle.value)
        });

        linkLabel.forEach((linkLabelStyle) => {
            this.#linkLabel.attr(linkLabelStyle.name, linkLabelStyle.value)
        });

        this.#linkLabel.style("font-size", fontSize + 'px');

        this.#linkLabel.attr("fill", fontColor)


    }

    setLinkDistance(width) {
        this.#simulation.force("link", d3.forceLink(this.links).id(function (d) {
            return d.id
        }).distance(width))
    }
}
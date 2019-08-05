import * as d3 from "d3";

export default class Links {
    links;
    simulation;

    constructor(links, simulation) {
        this.links = links;
        this.simulation = simulation;
    }

    setClass(className) {
        this.links.attr("class", className);
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.links.attr(style.name, style.value)
        })
    }

    setLinkDistance(width) {
        this.simulation.force("link", d3.forceLink(this.links).id(function (d) {
            return d.id
        }).distance(width))
    }
}
import * as d3 from "d3";

export default class Links {
    links;
    #linkLabel;
    #simulation;

    constructor(links, linkLabel, simulation) {
        this.links = links;
        this.#linkLabel = linkLabel;
        this.#simulation = simulation;
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
        this.#simulation.force("link", d3.forceLink(this.links).id(function (d) {
            return d.id
        }).distance(width))
    }

    setTextAttrStyle(styles) {
        styles.forEach((style) => {
            this.#linkLabel.attr(style.name, style.value)
        })
    }

    setFontSize(size) {
        this.#linkLabel.style("font-size", size + 'px')
    }

    setFontColor(color) {
        this.#linkLabel.attr("fill", color)
    }
}
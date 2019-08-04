class Link {
    links;
    linksDistance;

    getLinks(graphSvg, links) {
        this.links = graphSvg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link")
            .attr('stroke', '#E5E5E5');
        return this.links;
    }

    setLinkStyle() {

    }
}

export default new Link();
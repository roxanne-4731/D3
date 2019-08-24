import Nodes from "./nodes";
import Links from "./links";

export default class SvgGraph {

    graph;
    nodes;
    links;
    #root;
    event;

    constructor(graph, simulation, root) {
        this.graph = graph;
        this.#root = root;
        this.nodes = new Nodes(simulation, graph);
        this.links = new Links(graph, simulation);
    }

    setStyle(styles) {
        styles.forEach((style, index) => {
            this.graph.attr(style.name, style.value)
        })
    }

    setGraph(graph) {
        this.nodes.setNodes(graph);
        this.links.setLinks(graph);
    }
}
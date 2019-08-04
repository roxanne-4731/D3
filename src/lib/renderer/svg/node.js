import {custom} from "../../../../example/assets/json/data";
import * as d3 from "d3";

export default class Nodes {

    constructor(nodes) {
        this.nodes = nodes;
    }


    getNodes() {

    }

    dragStarted() {

    }

    dragged() {

    }

    dragEnd() {

    }

    onNodesClick() {

    }

    onNodesMouseOver() {

    }

    setNodesStyle() {

    }

    setClassName(className) {
        console.log('hi how are you ?? ');
        this.nodes.attr("class", className);
    }
}

export default class Base {

    constructor(data, height, width) {
        this.data = data;
        this.height = height;
        this.width = width;
    }

    initRectGraph(height, width) {
        throw new Error('You have to implement the method doSomething!');
    }
    initCircleGraph(radius) {
        throw new Error('You have to implement the method doSomething!');
    }

    simulateGraph() {

    }

    dragAction() {

    }
    zoomAction() {

    }

    setLinksStyle() {

    }

    setNodesStyle() {

    }
    tickedAction() {

    }
}
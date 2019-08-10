import React, {Component} from 'react';
import D3ExampleOne from './D3Examples/D3TooltipHtml';
import D3ExampleTwo from './D3Examples/D3Canvas';
import D3ExampleThree from './D3Examples/D3Subset';
import D3ExampleFoure from './D3Examples/D3TooltipSvg';
import D3ExampleFive from './D3Examples/D3Zoom&Drag';
import D3ExampleSix from './D3Examples/D3Collapsible';
import GraphClass from './D3Examples/GraphClass';


import '../assets/styles/D3Base.css';

export default class App extends Component {
    state = {
        number: 0
    };
    renderExampleOne = (number) => {
        this.setState({number})
    };
    showRender = (number) => {
        switch (number) {
            case 1 :
                return (
                    <div className="container-style">
                        <h2 className="title-style">Using Graph Class</h2>
                        <GraphClass/>
                    </div>
                );
            case 2:
                return (
                    <div className="container-style">
                        <h2 className="title-style">Canvas</h2>
                        <D3ExampleTwo/>
                    </div>
                );
            case 3:
                return (
                    <div className="container-style">
                        <h2 className="title-style">Subset</h2>
                        <D3ExampleThree/>
                    </div>
                );
            case 4:
                return (
                    <div className="container-style">
                        <h2 className="title-style">Tooltip using svg</h2>
                        <D3ExampleFoure/>
                    </div>
                );
            case 5:
                return (
                    <div className="container-style">
                        <h2 className="title-style">Zoom and Drag</h2>
                        <D3ExampleFive/>
                    </div>
                );
            case 6:
                return (
                    <div className="container-style">
                        <h2 className="title-style">Collapsible</h2>
                        <D3ExampleSix/>
                    </div>
                );
            default :
                return (
                    <h2 className="title-style">D3 Examples</h2>
                )
        }
    };

    render() {
        return (
            <div className="layout-style">
                <div className="buttons-style">
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(1)}>Custom Library</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(2)}>Canvas</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(3)}>Show Subset</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(4)}>Tooltip using svg</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(5)}>Zoom and Drag</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(6)}>Collapsible</button>
                </div>
                <div className="container-style">
                    {this.showRender(this.state.number)}
                </div>
            </div>
        );
    }
}
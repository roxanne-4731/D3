import React, {Component} from 'react';
import D3ExampleOne from './D3Examples';
import D3ExampleTwo from './D3Example2';
import D3ExampleThree from './D3Example3';
import D3ExampleFoure from './D3Example4';
import D3ExampleFive from './D3Example5';

import '../Styles/D3Base.css';

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
                        <h2 className="title-style">Tooltip using html</h2>
                        <D3ExampleOne/>
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
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(1)}>Example 1</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(2)}>Example 2</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(3)}>Example 3</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(4)}>Example 4</button>
                    <button className="buttonStyle" onClick={() => this.renderExampleOne(5)}>Example 5</button>
                </div>
                <div className="container-style">
                    {this.showRender(this.state.number)}
                </div>
            </div>
        );
    }
}
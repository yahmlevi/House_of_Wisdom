import React, {Component} from 'react';
import ReadString from "./ReadString";
import SetString from "./SetString";
import Navbar from './Navbar'
// import Main from './Main'
import './App.css'

// import { DrizzleProvider } from "@drizzle/react-plugin"

// import { 
//     LoadindContainer, 
//     AccounData
//  } from "@drizzle/react-components"

class App extends Component {
    state = {loading: true, drizzleState: null};

    componentDidMount() {
        const { drizzle } = this.props;

        // subscribe to changes in the store
        this.unsubscribe = drizzle.store.subscribe(() => {

            // every time the store updates, grab the state from drizzle
            const drizzleState = drizzle.store.getState();

            // check to see if it's ready, if so, update local component state
            if ( drizzleState.drizzleStatus.initialized ) {
                this.setState({loading: false, drizzleState});
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        // const { drizzle } = this.props;
        
        if (this.state.loading) return "Loading Drizzle...";
        return (

            // <DrizzleProvider options={drizzle.options} >

                <div>
                    <Navbar account={this.state.account} />

                    {/* <AccounData accountIndex={0} units={"ether"} precision={3} /> */}
                    
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
                            <div className="content mr-auto ml-auto">
                                <a
                                href="http://www.dappuniversity.com/bootcamp"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                </a>
                
                                {content}
                
                            </div>
                            </main>
                        </div>
                    </div>
            
                    <div className="App">
                        {/* <LoadindContainer> */}
                            <ReadString
                                drizzle={this.props.drizzle}
                                drizzleState={this.state.drizzleState}
                            />
                        {/* </LoadindContainer> */}
                        <SetString
                            drizzle={this.props.drizzle}
                            drizzleState={this.state.drizzleState}
                        />
                        <div>Some text</div>
                        <ReadString
                            drizzle={this.props.drizzle}
                            drizzleState={this.state.drizzleState}
                        />
                    </div>

                </div>

            // </DrizzleProvider>
        );
    }
}

export default App;
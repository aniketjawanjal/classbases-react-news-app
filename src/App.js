
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  pageSize=9;
  apiKey=process.env.REACT_APP_NEWS_KEY     //'8d7be6ffb6624be2a65e898c044d1823'; //dbe57b028aeb41e285a226a94865f7a7



  state={
    progress : 10
  }
  setProgress=(progress)=>{
this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        
            <Navbar></Navbar>
            <LoadingBar height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exect  path="/" element={<News setProgress={this.setProgress} key="/" pageSize={this.pageSize} country='in'
            apiKey={this.apiKey} category=''></News>} />

            <Route exect  path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country='in'
            apiKey={this.apiKey} category='business'></News>} />

            <Route exect  path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} 
            country='in'apiKey={this.apiKey} category='entertainment'></News>} />

            <Route exect  path="/general" element={<News setProgress={this.setProgress} key="general"pageSize={this.pageSize} 
            country='in'apiKey={this.apiKey} category='general'></News>} />

            <Route exect  path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} 
            country='in'apiKey={this.apiKey} category='health'></News>} />

            <Route exect  path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} 
            country='in'apiKey={this.apiKey} category='science'></News>} />

            <Route path="/sports" element={<News setProgress={this.setProgress} 
            key="sports" pageSize={this.pageSize} country='in'apiKey={this.apiKey} category='sports'></News>} />

            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology"pageSize={this.pageSize} country='in'
            apiKey={this.apiKey} category='technology'></News>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

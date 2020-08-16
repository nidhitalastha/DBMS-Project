import React from 'react';
import 'antd/dist/antd.css';
import 'bulma/css/bulma.css';
import SiderDemo from './Components/SiderDemo';



export default class App extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        loggedin : false
      }
  }
  render() {
    return (
      <div>
        <SiderDemo />
      </div>
    )
  }
}

import React, { Component } from 'react'
import MyHeader from '../components/MyHeader'

export default class Tagline extends Component {
    render() {
        return (
            <>
               

         <div className="flex-col">
             
             <MyHeader/>
             <div className="flex-col tag-container">
                 <p className="tag">Your ideal flight </p><p className="tag" style={{paddingTop:"0"}}>is just one Search away !</p>
                 <div className ="tag sub-tag">
                     <p >We've partnered with over<strong> 200</strong> airlines ,<br/> to give you the freedom to choose.</p>
                 </div>
             </div>
         </div>
            </>
        )
    }
}

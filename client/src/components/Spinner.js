//A component used to show loading icon whenever the page is loading
import React from "react";
import {Spin} from 'antd'

function Spinner(){
    return (
        <div className="spinner">
            <Spin size="large"/>        {/* Rendering the spinner icon and setting size to be large*/}
        </div>
    )
}

export default Spinner  
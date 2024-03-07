import React, { useState } from "react";
import ExpandedContents from "./ExpandedContents";

function TruckCard(props) {

    function clickTruckTitle() {
        if (props.expandedTruck !== props.truckKey) { // in case either blank or a different
            props.setExpandedTruck(props.truckKey) // then set to this truck
        } else if (props.expandedTruck === props.truckKey) { // in case same truck being clicked as already expanded
            props.setExpandedTruck("") //hide truck
        }
    }
    
    if(props.name.toLowerCase().includes(props.truckQuery.toLowerCase())){
        return (
            <div className={"truckCard" + (props.expandedTruck === props.truckKey ? " expanded" : "")}>
                <h1 className={props.expandedTruck === props.truckKey
                    ? "selected-title"
                    : "unselected-title"} onClick={clickTruckTitle}>{props.name}</h1>
                {props.images ? props.images.map((image, index) => <img key={index} src={image} />) : null}
                <p>{props.description}</p>
                <ul>
                    {props.usedFor ? props.usedFor.map((usedFor, index) => <li key={index} className="badge">{usedFor}</li>) : ""}
                </ul>

                {props.expandedTruck === props.truckKey ? <ExpandedContents truckKey={props.truckKey} truckObject={props.truckObject} /> : null}
            </div>
        )
    }
    
}

export default TruckCard
import React from "react";
import ExpandedContents from "./ExpandedContents";

const imgContext = require.context('../img', true);

function TruckCard(props) {
    const {name, description, images, usedFor} = props.truckObject

    function clickTruckTitle() {
        if (props.expandedTruck !== props.truckKey) { // in case either blank or a different
            props.setExpandedTruck(props.truckKey) // then set to this truck
        } else if (props.expandedTruck === props.truckKey) { // in case same truck being clicked as already expanded
            props.setExpandedTruck("") //hide truck
        }
    }
    let imagesPresent = []
        images.forEach((image) => {
            try {if (imgContext(image)) {
                imagesPresent.push(image)
            }}
            catch (err) {console.log("there's an image not found but that's okay")}
            
     })
        return (
            <div className={"truckCard" + (props.expandedTruck === props.truckKey ? " expanded" : "")}>
                <h1 className={props.expandedTruck === props.truckKey
                    ? "selected-title"
                    : "unselected-title"
                }
                onClick={clickTruckTitle}>{name}</h1>
                {imagesPresent ? imagesPresent.map((image, index) => <img key={index} src={imgContext(image)} />) : null}
                <p>{description}</p>
                <ul>
                    {usedFor ? usedFor.map((usedFor, index) => <li key={index} className="badge">{usedFor}</li>) : ""}
                </ul>

                {props.expandedTruck === props.truckKey ? <ExpandedContents truckKey={props.truckKey} truckObject={props.truckObject} /> : null}
            </div>
        )
    
    
}

export default TruckCard
import React from "react";
import PreTripSection from "./TruckCardSections/PreTrip";


function ExpandedContents(props) {
    return (
        <div className="expandedContents">
            <input type="text" placeholder={props.truckObject.name + " Search..."}></input>
            {props.truckObject.preTrip
                ? <PreTripSection preTripObject={props.truckObject.preTrip} />
                : null
            }
        </div>
    );
}


export default ExpandedContents
import React, { useState } from "react";
import PreTripSection from "./TruckCardSections/PreTrip";


function ExpandedContents(props) {

    let [contentsQuery, setContentsQuery] = useState("");
    
    // there is logic inside PreTripSection to check contentsQuery and display whole section if it matches "pretrip" or just a portion of the section if it contains that
    return (
        <div className="expandedContents">
            <input onChange={(e) => setContentsQuery(e.target.value)} type="text" placeholder={props.truckObject.name + " Search..."}></input>
            {props.truckObject.preTrip
                ? <PreTripSection preTripObject={props.truckObject.preTrip}  contentsQuery={contentsQuery}/>
                : null
            }
        </div>
    );
}


export default ExpandedContents
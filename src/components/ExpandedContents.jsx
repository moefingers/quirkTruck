import React, { useState } from "react";
import PreTripSection from "./TruckCardSections/PreTrip";
import QuirksSection from "./TruckCardSections/Quirks";
import PostTrip from "./TruckCardSections/PostTrip";

export default function ExpandedContents(props) {

    let [contentsQuery, setContentsQuery] = useState("");
    // on todo list to have useEffect out here instead of implemented in each section.. somehow. code looks super similar. Tried making a function and params for varying data to little avail.


    // there is logic inside PreTripSection to check contentsQuery and display whole section if it matches "pretrip" or just a portion of the section if it contains that
    return (
        <div className="expandedContents">
            <input onChange={(e) => setContentsQuery(e.target.value)} type="text" placeholder={props.truckObject.name + " Search..."}></input>
            {props.truckObject.preTrip ?
            <PreTripSection preTripObject={props.truckObject.preTrip}  contentsQuery={contentsQuery}/>
                : null}
            {props.truckObject.quirks ? 
            <QuirksSection quirksObject={props.truckObject.quirks} contentsQuery={contentsQuery}/>
                : null}
            {props.truckObject.postTrip ?
            <PostTrip postTripObject={props.truckObject.postTrip} contentsQuery={contentsQuery}/>
                : null}
        </div>
    );
}
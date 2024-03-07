import React, { useState } from "react";


function ExpandedContents(props) {
    console.log(props.truckObject)
    return (
        <div className="expandedContents">
            <input type="text" placeholder={props.truckObject.name + " Search..."}></input>
            {props.truckObject.preTrip
                ? <div className="preTripSection">
                <h2>Pre Trip</h2>
                    
                    {
                        Object.keys(props.truckObject.preTrip)
                        .filter((preTripKey) => {return preTripKey !== "lights"})
                        .map((preTripKey) => 
                            <h3>{props.truckObject.preTrip[preTripKey].name}</h3>
                        )
                    }
                    
                </div>
                : null
            }
        
        </div>
    );
}


export default ExpandedContents
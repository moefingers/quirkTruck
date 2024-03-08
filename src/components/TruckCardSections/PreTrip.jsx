import React from "react";

//Using PreTripSection will generate a PreTripSection including all PreTripItems

// lights is done sepereately below because lights is an object with nested objects
export default function PreTripSection(props) {
    
    return (
        <div className="pre-trip-section">
                <h2>Pre Trip</h2>
                { // all items except lights
                    Object.keys(props.preTripObject) // Gets all keys from preTrip
                    .filter((preTripItemKey) => {return preTripItemKey !== "lights"}) // except lights
                    .map((preTripItemKey, index) => // generates an item for each one
                        <PreTripItem key={index} preTripItemObject={props.preTripObject[preTripItemKey]}/> // passes each pretrip item through to PreTripItem to render
                    )
                }
                { // lights
                    props.preTripObject.lights // if lights is present in pretrip 
                    ? <LightsSection lightsObject={props.preTripObject.lights} /> // passes lights pretrip item through to Lights to render
                    : null
                }
                    
        </div>
    );
}

// note: this is generally iterated over all items in pretrip item EXCEPT lights.. see Lights.jsx for lights
function PreTripItem(props) {
    const { name, images, type, location, notes } = props.preTripItemObject;
    return (
      <div className="pre-trip-item">
        <h3>{name}</h3>
          {type ? <p>Type: {type}</p> : null }
          {location ? <p>Location: {location}</p> : null }
          {notes ? <p>Notes: {notes}</p> : null }
          {images // if images are present for item
              ? images.map((image, index) => // make an image tag out of each image url
                      <img key={index} src={image} />    )
              : null
          }
      </div>
    );
  }

  function LightsSection(props) {
    
    return (
        <div className="lights-section">
            <h3>Lights</h3>
            {
                Object.keys(props.lightsObject).map((lightKey, index) =>{
                    return <LightsItem lightItemObject={props.lightsObject[lightKey]} key={index} />
                })
            }
        </div>
    )
  }

  function LightsItem(props) {
    const { name, images, notes } = props.lightItemObject;
    return (
        <div className="lights-item">
            <h4>{name}</h4>
            {notes ? <p>{notes}</p> : null }
            {images // if images are present for item
                ? images.map((image, index) => // make an image tag out of each image url
                        <img key={index} src={image} />    )
                : null
            }
        </div>
    )
  }
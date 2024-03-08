import React, { useEffect, useState } from "react";
import {stringMatch} from "../../App";


export default function PostTripSection(props) {
    const { contentsQuery, postTripObject } = props;
    let [sectionTitleMatch, setSectionTitleMatch] = useState(false);
    let [postTripChildQueryMatch, setPostTripChildQueryMatch] = useState(true);

    useEffect(() => {
        // if "post trip" contains contents query
        if (stringMatch("Post Trip", contentsQuery)) {
            setSectionTitleMatch(true);
        } else {
            setSectionTitleMatch(false);
        }
        //initalize found any item bool
        let foundOne = false
        // check if any item contains contents query and assigns value to postTripChildQueryMatch
        // as well as setting that one item is found so the section itself can still render
        Object.keys(postTripObject).forEach((postTripItemKey) => {
            const postTripItemName = postTripObject[postTripItemKey].name
            if (stringMatch(postTripItemName, contentsQuery)) {
                setPostTripChildQueryMatch(true);
                foundOne = true
            } else {
                setPostTripChildQueryMatch(false);
            }
        })
        if (foundOne) {
            setPostTripChildQueryMatch(true);
        }

    }, [contentsQuery, postTripObject])

    if (postTripChildQueryMatch || sectionTitleMatch) { // to display the section if either the title or any item contains the query
        return (
            <div className="post-trip-section">
                <h2>Post Trip</h2>
                { // all items
                    Object.keys(postTripObject)
                    .filter((postTripItemKey) => {return stringMatch(postTripObject[postTripItemKey].name, contentsQuery) || sectionTitleMatch})
                    .map((postTripItemKey, index) => // generates an item for each one
                        <PostTripItem key={index} postTripItemObject={postTripObject[postTripItemKey]}/> // passes each postTrip item through to PostTripItem to render
                    )
                }
            </div>
        );
    }
}


function PostTripItem(props) {
    const { name, images, notes } = props.postTripItemObject
    return (
        <div className="post-trip-item">
            <h3>{name}</h3>
            {notes ? <p>{notes}</p> : null}
            {images ? images.map((image, index) => 
            <img key={index} src={image} alt = {name + " image" + index}/>) : null}
        </div>
    );
}
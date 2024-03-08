import React, { useEffect, useState } from "react";
import {stringMatch} from "../../App";


export default function QuirksSection(props) {
    const { contentsQuery, quirksObject } = props;
    let [sectionTitleMatch, setSectionTitleMatch] = useState(false);
    let [quirksChildQueryMatch, setQuirksChildQueryMatch] = useState(true);

    useEffect(() => {
        // if "quirks" contains contents query
        if (stringMatch("Quirks", contentsQuery)) {
            setSectionTitleMatch(true);
        } else {
            setSectionTitleMatch(false);
        }
        //initalize found any item bool
        let foundOne = false
        // check if any item contains contents query and assigns value to quirksChildQueryMatch
        // as well as setting that one item is found so the section itself can still render
        Object.keys(quirksObject).forEach((quirkItemKey) => {
            const quirkItemName = quirksObject[quirkItemKey].name
            if (stringMatch(quirkItemName, contentsQuery)) {
                setQuirksChildQueryMatch(true);
                foundOne = true
            } else {
                setQuirksChildQueryMatch(false);
            }
        })
        if (foundOne) {
            setQuirksChildQueryMatch(true);
        }
    }, [contentsQuery, quirksObject])
    
    if (quirksChildQueryMatch || sectionTitleMatch) { // to display the section if either the title or any item contains the query
        return (
            <div className="quirks-section">
                    <h2>Quirks</h2>
                    { // all items
                        Object.keys(quirksObject) // Gets all keys from quirks
                        .filter((quirkItemKey) => {return stringMatch(quirksObject[quirkItemKey].name, contentsQuery) || sectionTitleMatch}) // and only items that contain the query or all of them if section title matches
                        .map((quirkItemKey, index) => // generates an item for each one
                            <QuirkItem key={index} quirkItemObject={quirksObject[quirkItemKey]}/> // passes each quirk item through to QuirkItem to render
                        )
                    }
            </div>
        );
    }
}


function QuirkItem(props) {
    const { name, tags, explanation, images} = props.quirkItemObject
    return (
        <div className="quirk-item">
            <h3>{name}</h3>
            {tags ?
            <ul>
                {tags.includes("operation") ? <li className='quirkTag'>Affects <strong>operation</strong>.</li> : null}
                {tags.includes("prevention") ? <li className='quirkTag'>Prevents <strong>damage</strong> to equipment.</li> : null}
                {tags.includes("safety") ? <li className='quirkTag'><strong>Safety Warning</strong></li> : null}
            </ul> : null}
            {explanation ?
            <p>{explanation}</p> : null}
            {images ? images.map((image, index) => 
            <img key={index} src={image} alt = {name + " image" + index}/>) : null}
        </div>
    );
}
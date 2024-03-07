

function TruckCard(props) {
    return (
        <div className="truckCard">
            <h1>{props.name}</h1>
            {props.images ? props.images.map((image) => <img src={image} />) : ""}
            <p>{props.description}</p>
            <ul>
                {props.usedFor ? props.usedFor.map((usedFor) => <li className="badge">{usedFor}</li>) : ""}
            </ul>
        </div>
    );
}

export default TruckCard
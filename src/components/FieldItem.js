import React from "react";
import edit from "../img/edit.png";
import close from "../img/close.png";

const FieldItem = ({ field, removeClick }) => {
    return (
        <li className="fields">
            <div className="dateResult">{field.date}</div>
            <div className="distanceResult">{field.distance}</div>
            <div className="actionsResult">
                <div className="editField">
                    <img src={edit} alt="Edit" />
                </div>
                <div className="removeField" onClick={removeClick}>
                    <img src={close} alt="Close" />
                </div>
            </div>
        </li>
    );
}

export default FieldItem;
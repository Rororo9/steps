import React, { useState, useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import FieldList from "./FieldList";

const Accounting = () => {
    const [fields, setFields] = useState([]);
    const [newTitleDate, setNewTitleDate] = useState("");
    const [newTitleDistance, setNewTitleDistance] = useState("");

    const handlerSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const dateReg = /^\d{2}[.]\d{2}[.]\d{4}$/;
            const distanceReg = /^\d{0,3}[.]?\d{1,2}$/;

            if (dateReg.test(newTitleDate) && distanceReg.test(newTitleDistance)) {
                const existingField = fields.find(
                    (field) => field.date === newTitleDate
                );
                if (existingField) {
                    const sum =
                        Number.parseFloat(existingField.distance) +
                        Number.parseFloat(newTitleDistance);
                    existingField.distance = sum.toLocaleString("ru-RU");
                    setFields([...fields]);
                } else {
                    const newFields = {
                        id: nanoid(),
                        date: newTitleDate,
                        distance: newTitleDistance,
                    };
                    setFields((prevFields) => [...prevFields, newFields]);
                }
                setNewTitleDate("");
                setNewTitleDistance("");
            }
        },
        [fields, newTitleDate, newTitleDistance]
    );

    const changeDate = useCallback(
        (e) => {
            setNewTitleDate(e.target.value);
        },
        []
    );

    const changeDistance = useCallback(
        (e) => {
            setNewTitleDistance(e.target.value);
        },
        []
    );

    const memoizedFields = useMemo(() => fields, [fields]);

    return (
        <div className="container-form">
            <form onSubmit={handlerSubmit} className="appForm">
                <div className="formDiv">
                    <p>Дата (ДД.ММ.ГГГГ)</p>
                    <input
                        className="inputDate"
                        value={newTitleDate}
                        placeholder="Введите дату"
                        onChange={changeDate}
                    />
                </div>
                <div className="formDiv">
                    <p>Пройдено км</p>
                    <input
                        className="inputDistance"
                        value={newTitleDistance}
                        placeholder="км"
                        onChange={changeDistance}
                    />
                </div>
                <button className="okBtn">ОК</button>
            </form>
            <FieldList fields={memoizedFields} />
        </div>
    );
}

export default Accounting;
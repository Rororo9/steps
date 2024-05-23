import { useCallback } from "react";
import FieldItem from "./FieldItem";

const FieldList = ({ fields }) => {
    const removeClick = useCallback((e) => {
        e.target.closest(".fields").remove();
    }, []);

    const sortedFields = useMemo(() => {
        if (fields.length > 0) {
            return [...fields].sort((a, b) =>
                a.date.localeCompare(b.date, undefined, { numeric: true })
            );
        }
        return [];
    }, [fields]);

    return (
        <div className="result">
            <div className="headers">
                <p>Дата (ДД.ММ.ГГГГ)</p>
                <p>Пройдено км</p>
                <p>Действия</p>
            </div>
            <ol className="resultOutput">
                {sortedFields.map((field) => (
                    <FieldItem key={field.id} field={field} removeClick={removeClick} />
                ))}
            </ol>
        </div>
    );
}

export default FieldList;
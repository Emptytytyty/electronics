import "../../assets/images/trash.svg";
import { useDispatch } from "../../services/store";
import "./Table.css";

type TableProps = {
  titles: string[];
  rows: Record<string, any>[];
  deleteAction: any;
};

export const Table = ({ titles, rows, deleteAction }: TableProps) => {
  const dispatch = useDispatch();
  const handleDelete = (identifier: string | number) => {
    dispatch(deleteAction({ identifier }));
  };

  return (
    <div className="table__wrapper">
      <table className="table">
        <thead className="table__head">
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key, index) => (
                <th key={index}>{row[key]}</th>
              ))}
              <button
                onClick={() => handleDelete(row.id || row.name)}
                title="Удалить строку"
                className="table__delete-button"
              ></button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

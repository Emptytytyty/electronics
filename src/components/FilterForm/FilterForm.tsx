import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useDispatch } from "../../services/store";
import "./FilterForm.css";

type FilterFormProps = {
  formName: string;
  filters: string[];
  getAction: any;
  addAction: any;
};

export const FilterForm = ({
  formName,
  filters,
  getAction,
  addAction,
}: FilterFormProps) => {
  const [getFormState, setGetFormState] = useState(
    filters.reduce((acum, filter) => {
      acum[filter] = "";
      return acum;
    }, {} as Record<string, string>)
  );

  const [addFormState, setAddFormState] = useState(
    filters.reduce((acum, filter) => {
      acum[filter] = "";
      return acum;
    }, {} as Record<string, string>)
  );

  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();

  const handleGetInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGetFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitGet = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getAction(getFormState));
  };

  const handleAddInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitAdd = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addAction({ row: { ...addFormState } }));
    setAddFormState((prev) => ({
      ...prev,
      ...filters.reduce((acum, filter) => {
        acum[filter] = "";
        return acum;
      }, {} as Record<string, string>),
    }));
  };

  useEffect(() => {
    const isFormReady = !Object.entries(addFormState).some(
      ([key, value]) => key !== "dismissal_date" && key !== "id" && value === ""
    );
    if (addButtonRef.current) addButtonRef.current.disabled = !isFormReady;
  }, [addFormState]);

  return (
    <div className="filter">
      <form name={formName} onSubmit={handleSubmitGet} className="filter__form">
        <h3 className="filter__title">{formName}</h3>
        {filters.map((filter, index) => (
          <input
            className="filter__input"
            onChange={handleGetInputChange}
            key={index}
            name={filter}
            placeholder={filter}
          />
        ))}
        <button className="filter__button">Получить</button>
      </form>
      <form name={formName} onSubmit={handleSubmitAdd} className="filter__form">
        <h3 className="filter__title">{formName}</h3>
        {filters.map((filter, index) => (
          <input
            className="filter__input"
            onChange={handleAddInputChange}
            key={index}
            name={filter}
            value={addFormState[filter]}
            placeholder={filter}
          />
        ))}
        <button ref={addButtonRef} className="filter__button">
          Добавить
        </button>
      </form>
    </div>
  );
};

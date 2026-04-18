import { FilterForm } from "../../FilterForm/FilterForm";
import {
  useDispatch,
  useSelector,
  type RootState,
} from "../../../services/store";
import {
  clearDataError,
  getDataError,
  getDataRequest,
} from "../../../services/slices/MainDataSlice";
import type { tables } from "../../../types";
import { Table } from "../../Table/Table";
import type { Selector } from "react-redux";
import { Preloader } from "../../Preloader/Preloader";
import { useEffect } from "react";
import { getUserSelector, logout } from "../../../services/slices/UserSlice";

type TabElementProps = {
  getAction: any;
  addAction: any;
  deleteAction: any;
  filters: string[];
  formName: string;
  selector: Selector<RootState, tables[]>;
  className?: string;
};

export const TabElement = ({
  getAction,
  addAction,
  deleteAction,
  filters,
  formName,
  selector,
  className,
}: TabElementProps) => {
  const dataError = useSelector(getDataError);
  const dataRequest = useSelector(getDataRequest);
  const tableData = useSelector(selector);
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector)

  useEffect(() => {
    if (dataError && dataError === "Аутентификация не пройдена") {
      dispatch(logout(user!));
      dispatch(clearDataError());
    }
  }, [dataError]);

  return (
    <div className={className}>
      <FilterForm
        getAction={getAction}
        addAction={addAction}
        filters={filters}
        formName={formName}
      ></FilterForm>
      {dataError ? (
        <p className="filter__error">{dataError}</p>
      ) : dataRequest ? (
        <Preloader />
      ) : tableData.length ? (
        <Table deleteAction={deleteAction} titles={Object.keys(tableData[0])} rows={tableData}></Table>
      ) : (
        <p className="filter__banner">Сделайте запрос</p>
      )}
    </div>
  );
};

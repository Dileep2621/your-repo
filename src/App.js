import { useEffect } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import InputLimit from "./components/InputLimit";
import SelectLimit from "./components/SelectLimit";
import InputSearch from "./components/InputSearch";
import TableData from "./components/TableData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemsPerPage } from "./slice/paginationSlice";
import { fetchData } from "./slice/dataSlice";
function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const inputSearch = useSelector((state) => state.inputSearch.searchText);
  const { data, loading, error } = useSelector((state) => state.data);
  const totalPages = Math.ceil(data?.metadata?.totalCount / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchData({ inputSearch, itemsPerPage, offset }));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, inputSearch, itemsPerPage, offset]);

  useEffect(() => {
    dispatch(setItemsPerPage(itemsPerPage));
  }, [itemsPerPage, dispatch]);

  return (
    <div className="App">
      <div className="searchBar">
        <InputSearch />
        <SelectLimit />
      </div>
      <div className="tableData">
        <TableData
          loading={loading}
          data={data}
          offset={offset}
          error={error}
        />
      </div>
      {data?.data?.length > 0 && (
        <>
          <Pagination totalPages={totalPages} />
          <InputLimit />
        </>
      )}
    </div>
  );
}

export default App;

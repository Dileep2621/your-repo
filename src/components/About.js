import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { debounce } from "../utils/Debounce";
function About() {
  const initailItem = 3;
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limitError, setLimitError] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(initailItem);
  const [limit, setLimit] = useState(itemsPerPage);
  const [selectItem, setSelectItem] = useState(itemsPerPage);
  const pageParam = new URLSearchParams(window.location.search).get("page");
  const pageNumber = pageParam ? parseInt(pageParam) : 1;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const totalPages = Math.ceil(data?.metadata?.totalCount / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: {
            namePrefix: search,
            limit: itemsPerPage,
            offset: offset,
          },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": process.env.REACT_APP_API_URL,
          },
        }
      );
      setLoading(true);
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  // UseCallback to debounce the fetchData function
  const debouncedFetchData = useCallback(debounce(fetchData, 1000), [
    search,
    itemsPerPage,
    offset,
  ]);

  useEffect(() => {
    debouncedFetchData(search, itemsPerPage, offset); // This will now be debounced
  }, [debouncedFetchData, search, itemsPerPage, offset]);

  const onChangeSearch = (e) => {
    setName(e.target.value);
    setSearch(name);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setSearch(name);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [name]);

  const limitHandle = (e) => {
    let value = e.target.value;

    if (value > 10) {
      setLimitError(true);
      setItemsPerPage(initailItem);
      setLimit(value);
    } else {
      setLimitError(false);
      setLimit(itemsPerPage);
      setItemsPerPage(value);
    }
  };

  const handlePagination = (n) => {
    setCurrentPage(n);
  };

  const getPaginationGroup = () => {
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationBar = getPaginationGroup().map((page, index) => {
    if (page === currentPage) {
      return (
        <button
          key={index}
          disabled={currentPage === page}
          className="xs-hidden sm-show"
        >
          {page}
        </button>
      );
    } else {
      return (
        <button
          key={index}
          onClick={() => handlePagination(page)}
          className="xs-hidden sm-show"
        >
          {page}
        </button>
      );
    }
  });

  const handleSelect = (e) => {
    let value = e.target.value;

    if (value > 0) {
      setItemsPerPage(value);
      setSelectItem(value);
    } else {
      setItemsPerPage(initailItem);
      setSelectItem(initailItem);
    }
  };

  return (
    <div className="App">
      <div className="searchBar">
        <span className="input-box">
          <input
            type="text"
            placeholder="Search"
            value={name}
            onChange={onChangeSearch}
          />
          <button className="btn-search">Ctrl + /</button>
        </span>
        <span className="select-box">
          <select value={selectItem} onChange={handleSelect}>
            <option value="">--Please select option--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </span>
      </div>
      <div className="tableData">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center">
                  {errorMessage}
                </td>
              </tr>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{offset + index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <div className="td-data">
                        <img
                          src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                          alt={item.name}
                          className="flag-img"
                        />
                        <span>{item.country}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No result found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data?.data?.length > 0 && (
        <>
          <div className="paginationData">
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {paginationBar}
            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="limitChangers">
            <input
              type="number"
              min={1}
              max={11}
              value={limit}
              onChange={limitHandle}
            />
            <span className="text-red text-small">
              {limitError ? "Warning: enters input above 10 not allowed!" : ""}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default About;

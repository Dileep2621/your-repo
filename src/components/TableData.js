import React from "react";
import Spinner from "./Spinner";

const TableData = ({ ...props }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {props.loading ? (
          <tr>
            <td colSpan={3} className="text-center">
              <Spinner />
            </td>
          </tr>
        ) : props.error ? (
          <tr>
            <td colSpan={3} className="text-center">
              {props.error}
            </td>
          </tr>
        ) : props.data?.data?.length > 0 ? (
          props.data?.data?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{props.offset + index + 1}</td>
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
  );
};

export default TableData;

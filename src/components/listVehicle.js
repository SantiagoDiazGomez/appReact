import React, { useState, useEffect, useMemo, useRef } from "react";
import { getVehicles, deleteVehicle, updateVehicle } from "../services/api";
import { useTable, usePagination  } from "react-table";
import { useNavigate } from 'react-router-dom';

const ListVehicle = () => {
  const [vehicles, setVehicles] = useState([]);  
  const vehicleRef  = useRef();
  const navigate = useNavigate();

  vehicleRef.current = vehicles;

  useEffect(() => { retrieveVehicles(); }, []);

  const retrieveVehicles = () => {
    getVehicles()
        .then((response) => { setVehicles(response.data); })
        .catch((e) => { console.log(e); });
  };

  const openDetailVehicle = (rowIndex) => {
    const id = vehicleRef.current[rowIndex].id;
    navigate("/vehicles/" + id);
  };

  const destroyVehicle = (rowIndex) => {
    const id = vehicleRef.current[rowIndex].id;

    deleteVehicle(id)
      .then((response) => {
        
        let newVehicles = [...vehicleRef.current];
        newVehicles.splice(rowIndex, 1);

        setVehicles(newVehicles);

        navigate("/vehicles");
      })
      .catch((e) => { console.log(e); });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nº de pedido",
        accessor: "numOrder",
      },
      {
        Header: "Bastidor",
        accessor: "frame",
      },
      {
        Header: "Modelo",
        accessor: "model",
      },
      {
        Header: "Matrícula",
        accessor: "licensePlate",
      },
      {
        Header: "Fecha de entrega",
        accessor: "deliveryDate",
      },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openDetailVehicle(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              {" "}
              <span onClick={() => destroyVehicle(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable({
    columns,
    data: vehicles,
    initialState: { pageIndex: 0 }
  },
  usePagination );

  const { pageIndex, pageSize } = state;

  return (
    <div className="list row">      
      <div className="col-md-12 list">
        <table className="table table-striped table-bordered" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>{" "}
          <span>
            Página{" "}<strong> {pageIndex + 1} de {pageOptions.length}</strong>{" "}
          </span>
          <span> | Ir a la página:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            {[10, 50, vehicles.length].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Ver {vehicles.length === pageSize ? "Todos" : pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListVehicle;
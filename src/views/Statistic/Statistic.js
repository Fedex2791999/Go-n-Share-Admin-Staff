import * as React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";

export default function BasicToolbarFilteringGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });
  const [selectionModel, setSelectionModel] = React.useState([]);
  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        checkboxSelection
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={(params) => {
          // setPage(params.page);
          console.log("params", params.page);
        }}
        pagination
        {...data}
        components={{
          Toolbar: GridToolbar,
        }}
        onSelectionModelChange={(newSelection) => {
          console.log("newSelection", newSelection);
          setSelectionModel(newSelection.selectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}

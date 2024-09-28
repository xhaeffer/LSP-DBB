import DataTableBase from "./DataTableBase";

const DataTableMain = ({ columns, data, searchText = "", onSearch, hideSearch, ...props }) => {
  const filteredData = data.filter((item) =>
    columns.some(
      (col) =>
        typeof col.selector === "function" &&
        col.selector(item) !== undefined && // Pastikan nilainya tidak undefined atau null
        col.selector(item) !== null &&
        col
          .selector(item)
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      {!hideSearch && (
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={onSearch}
          className="mb-4 px-3 py-2 border rounded"
        />
      )}
      <DataTableBase columns={columns} data={filteredData} {...props} />
    </div>
  );
};

export default DataTableMain;

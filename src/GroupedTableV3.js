import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


export default function GroupedTableV3({ tableData }) {
  console.log("RENDERRRRRRRRRRR");
  // console.table(tableData);

  const [tableRows, setTableRows] = useState(tableData);

  const toggleTableRow = selectedRow => {
    // console.log("toggleTableRow", selectedRow);

    let tempRows = [...tableRows];
    let found = tempRows.find(row => row.tokenId === selectedRow.tokenId);
    found.expanded = !found.expanded;

    console.table(tempRows);

    setTableRows(tempRows);
  }

  const [expandedRows, setExpandedRows] = useState([]);
  // console.log('expandedRows', expandedRows);

  const toggleRow = row => {
    let expRows = [];
    if (expandedRows.includes(row.tokenId)) {
      expRows = expandedRows.filter(item => item !== row.tokenId);
    } else {
      expRows = expandedRows.concat([row.tokenId]);
    }
    setExpandedRows(expRows);
  };

  return (
    <div>
      <p>Expanded Rows:</p>
      <ul>
        {tableRows.map((item) => (
          item.expanded && <li>{item.fullName}</li>
        ))}
      </ul>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full Name</TableCell>
            <TableCell>Token ID</TableCell>
            <TableCell>Submitted</TableCell>
            <TableCell>Request Status</TableCell>
            {/* {columns.map(item => (
          <TableCell key={item.title}>{item.title}</TableCell>
        ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell onClick={() => toggleTableRow(item)}>
                <IconButton>
                  {item.expanded ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
                <span>{item.fullName}</span>
              </TableCell>
              <TableCell>
                {item.tokenId} : {item.expanded ? "true" : "false"}
              </TableCell>
            </TableRow>
            // <React.Fragment>
            //   <TableRow key={index}>
            //     <TableCell colSpan={columns.length} onClick={() => toggleRow(key)}>
            //       <IconButton>
            //         {expandedRows[key] ? <ExpandMore /> : <ExpandLess />}
            //       </IconButton>
            //       <span>{key}</span>
            //     </TableCell>
            //   </TableRow>
            //   {expandedRows && groupedData[key].map(item => (
            //     <TableRow>
            //       <TableCell />
            //       <TableCell />
            //       {columns.map(col => (
            //         <TableCell>{item[col.dataKey]}</TableCell>
            //       ))}
            //     </TableRow>
            //   ))}
            // </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// export default GroupedTableV3;

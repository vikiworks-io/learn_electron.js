function create_table(table_id)
{
    var element = document.getElementById("container");
    var table = document.createElement("TABLE");
    table.id = table_id;
    element.appendChild(table);
}

/* c1, c2, c3, c4 are text to insert in cell_1, cell_2 ...
 */
function append_header_row(table_id, row_id, c1, c2, c3, c4, c5)
{
    var table = document.getElementById(table_id);
    var row = table.insertRow(row_id); 
    var cell_1 = row.insertCell(0);
    var cell_2 = row.insertCell(1);
    var cell_3 = row.insertCell(2);
    var cell_4 = row.insertCell(3);
    var cell_5 = row.insertCell(4);
    cell_1.innerHTML = '<b>' + c1 + '</b>';
    cell_2.innerHTML = '<b>' + c2 + '</b>';
    cell_3.innerHTML = '<b>' + c3 + '</b>';
    cell_4.innerHTML = '<b>' + c4 + '</b>';
    cell_5.innerHTML = '<b>' + c5 + '</b>';
}



/* c1, c2, c3, c4 are text to insert in cell_1, cell_2 ...
 */
function append_row(table_id, row_id, c1, c2, c3, c4, c5)
{
    var table = document.getElementById(table_id);
    var row = table.insertRow(row_id); 
    var cell_1 = row.insertCell(0);
    var cell_2 = row.insertCell(1);
    var cell_3 = row.insertCell(2);
    var cell_4 = row.insertCell(3);
    var cell_5 = row.insertCell(4);
    cell_1.innerHTML = c1;
    cell_2.innerHTML = c2;
    cell_3.innerHTML = c3;
    cell_4.innerHTML = c4;
    cell_5.innerHTML = c5;
}

function main()
{
    create_table("table1");
    append_header_row("table1", 0, "Image", "Lowest Price", "Highest Price", "Profit", "Link");
    append_row("table1", 1, "Image", "Lowest Price", "Highest Price", "Profit", "Link");
    append_row("table1", 2, "Image", "Lowest Price", "Highest Price", "Profit", "Link");
}


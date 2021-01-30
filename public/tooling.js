function colorToRow(xs){
  return xs.map((a, idx) => {
    a.color = (idx % 2) == 0 ? '#fff' : '#eef';
    return a;
  });
}
exports.colorToRow = colorToRow;

function sorter(xs, sortDirection, sortBy){
  return xs.sort((a,b) => {
    var result = 0;
    var direction = 0;

    if(sortDirection === 'asc') direction = 1;
    else if(sortDirection === 'desc') direction = -1;

    if(a[sortBy] < b[sortBy]) result = -1;
    else if(a[sortBy] > b[sortBy]) result = 1;

    return result * direction;
  })
}
exports.sorter = sorter;

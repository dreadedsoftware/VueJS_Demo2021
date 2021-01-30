const tooling = require('./tooling');

function range(a, b){
  var data = []
  for(i = a; i < b; ++i){
    data.push(i);
  }
  return data;
}
var data = () => range(1, 100).map(i => {
  return {'a': (i % 2 == 0) ? i : i*-1}
});

test('tooling: colorToRow', () => {
  var base = tooling.colorToRow(data());
  range(0, base.length-3).forEach(idx => {
    expect(base[idx].color).not.toBe(base[idx + 1].color);
    expect(base[idx].color).toBe(base[idx + 2].color);
  });
});

test('tooling: sorter', () => {
  function array_eq(a, b){
    return a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }
  //trivial case
  expect(array_eq([], tooling.sorter([]))).toBe(true);
  //simple case
  var r = Math.random();
  var s = [];
  var ss = []
  for(i = 0; i < 10; ++i){
    s.push({'a':r});
    ss.push({'a':r});
  }
  expect(array_eq(ss.map(a => a.a), tooling.sorter(s, 'asc', 'a').map(a => a.a))).toBe(true);
  expect(array_eq(ss.map(a => a.a), tooling.sorter(s, 'desc', 'a').map(a => a.a))).toBe(true);


  //complex case
  var base = data();var b = base.map(a => a.a);
  var asc = tooling.sorter(data(), 'asc', 'a');var a = asc.map(a => a.a);
  var desc = tooling.sorter(data(), 'desc', 'a');var d = desc.map(a => a.a);

  //prove all are different
  expect(array_eq(base, asc)).toBe(false);
  expect(array_eq(base, desc)).toBe(false);
  expect(array_eq(desc, asc)).toBe(false);

  //prove all have same elements
  a.forEach(i => {
    expect(b.includes(i)).toBe(true);
    expect(d.includes(i)).toBe(true);
  });

  //prove ordering
  var length = base.length;
  for(idx = 0; idx < length - 2; ++idx){
    expect(base[idx].a < base[idx+1].a).toBe(idx % 2 == 0);
    expect(asc[idx].a < asc[idx+1].a).toBe(true);
    expect(desc[idx].a < desc[idx+1].a).toBe(false);
  }
});

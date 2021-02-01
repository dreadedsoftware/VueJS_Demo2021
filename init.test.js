const init = require('./init');

test('html builder: script', () => {
  (new Array(10)).forEach(() => {
    var a = randomString();
    expect(init.script(a)).toBe('<script src="' + a + '"></script>');
  });
});

test('html builder: script init contains base', () => {
  expect(init.scripts_initial().startsWith(init.scripts_base())).toBe(true);
});

test('html builder: script comic contains base', () => {
  expect(init.scripts_comic().startsWith(init.scripts_base())).toBe(true);
});

test('comic', () => {
  var all = init.root.comicBooks();
  var ids = all.map(a => a.id);
  var idx = Math.floor(Math.random() * ids.length);
  expect(init.root.comicBook(idx)).toBe(undefined);

  var id = ids[idx];
  var topLevel = all[idx];
  var comic = init.root.comicBook({id:id});
  expect(comic).not.toBe(undefined);

  var supremum = topLevel.available + 1;
  var expected = topLevel.viewable;
  var actual = comic.length;
  expect(supremum).toBeGreaterThan(actual);
  expect(actual).toBe(expected);
});

function randomString(){
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var next = () =>
    characters.charAt(Math.floor(Math.random() * charactersLength));

  var result = (new Array(10)).reduce((acc, curr) =>
    acc + next(), '')

  return result;
}

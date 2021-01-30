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

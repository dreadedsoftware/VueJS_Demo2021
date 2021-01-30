const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

var schema = buildSchema(`
  type Query {
    comicBooks: [ComicBook!]!
    comicBook(id:Int!): [Comic!]
  }

  type ComicBook {
    id: Int!
    name: String!
    description: String!
    available: Int!
    viewable: Int!
    comics: [Comic!]!
  }

  type Comic {
    name: String!
    flavor: String!
  }
`);

var dataTypes = ['comics', 'series', 'stories', 'events'];
var jsonDb = fs.readFileSync("marvelcomics.json");
jsonDb = JSON.parse(jsonDb);
jsonDb = jsonDb.data.results.map(function(comicbook){
  comicbook.available = dataTypes.reduce((pre, cur) =>
    pre + comicbook[cur].available, 0);
  comicbook.viewable = dataTypes.reduce((pre, cur) =>
    pre + comicbook[cur].returned, 0);

  return comicbook;
});

var root = {
  comicBooks: () => {
    return jsonDb;
  },
  comicBook: (args) => {
    var comic = jsonDb.find(function(comic){
      return comic.id == args.id
    });

    var comics = dataTypes.reduce((pre, cur) => {
      var newValues = comic[cur].items.map(i => {
        i.flavor = cur;
        return i;
      });
      return pre.concat(newValues)}, []);

    return comics;
  }
};

const hostname = '127.0.0.1';
const port = 3000;

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/comic/:id', function(req, res){
  fs.readFile("comic_screen.html", function(err, text) {
    res.send(text + scripts_comic());
  });
});

app.get('*', function(req, res){
  fs.readFile("initial_screen.html", function(err, text) {
    res.send(text + scripts_initial());
  });
});

app.listen(3000);
console.log('Listening on port 3000');

function scripts_initial(){
  return scripts_base() +
    script("/initial_screen.js");
}

function scripts_comic(){
  return scripts_base() +
    script("/comic_screen.js");
}

function scripts_base(){
  return script("https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js") +
    script("/tooling.js")
}

function script(location){
  return '<script src="' + location + '"></script>';
}

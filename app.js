const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

var schema = buildSchema(`
  type Query {
    comicBooks: [ComicBook!]!
    comicBook(id:ID!): ComicBook!
  }

  type ComicBook {
    id: ID!
    name: String!
    description: String!
    available: Int!
    comics: [Comic!]!
  }

  type Comic {
    id: ID!
    name: String!
  }
`);

var jsonDb = fs.readFileSync("marvelcomics.json");
jsonDb = JSON.parse(jsonDb);
jsonDb = jsonDb.data.results.map(function(comicbook){
  comicbook.available = comicbook.comics.available;
  return comicbook;
});

var root = {
  comicBooks: () => {
    return jsonDb;
  },
  comicBook: (root, args, context, info) => {
    return jsonDb.find(function(comic){
      return comic.id == args.id
    })
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

//app.get('/comic/:id', function(req, res){
//  res.send(req.params.id);
//});

app.get('*', function(req, res){
  fs.readFile("initial_screen.html", function(err, text) {
    res.send(text + scripts());
  });
});

app.listen(3000);
console.log('Listening on port 3000');

function scripts(){
  return script("https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js") +
    script("initial_screen.js");
}

function script(location){
  return '<script src="' + location + '"></script>';
}

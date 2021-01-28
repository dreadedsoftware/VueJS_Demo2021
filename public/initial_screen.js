var raw = fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query:
    `{
      comicBooks{
        id
        available
        name
      }
    }`})
})

raw.then(r =>
  r.json().then(data => {
    console.log('!!!!!!!!')
    console.log(data.data.comicBooks)
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!',
        comics: data.data.comicBooks
      }
    });
  })
);

invoke = (event) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  var id = event.target.getAttribute('id');
  window.location.href='/comic/'+id;
}

function(ugh){
  
}

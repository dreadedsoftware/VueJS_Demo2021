function raw(){
  var _location = '/graphql';

  var _headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  var _dataMembers = `{
    comicBooks{
      id
      available
      name
    }
  }`;

  return fetch(_location, {
    method: 'POST',
    headers: _headers,
    body: JSON.stringify({query: _dataMembers})
  })
}

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    base_comics: [],
    sortBy: 'name',
    sortDirection: 'asc',
    pageNum: 0,
    pageLen: 20
  },
  created:function(){
    raw().then(r =>
      r.json().then(data => {
        this.base_comics = data.data.comicBooks;
      }))
  },
  methods: {
    sort: function(by){
      if(this.sortBy === by){
        this.sortDirection = (
          this.sortDirection === 'asc' ? 'desc' : 'asc'
        )
      }
      this.sortBy = by;
    },
    nextPage:function() {
      if(((this.pageNum+1)*this.pageLen) < this.base_comics.length) this.pageNum++;
    },
    prevPage:function() {
      if(this.pageNum > 0) this.pageNum--;
    },
    updateLen: function(){
      var target = document.getElementById('pageLen');
      this.pageLen = target.value;
      this.pageNum = 0;
    }
  },
  computed: {
    minItem: function(){
      return (this.pageNum * this.pageLen) + 1;
    },
    maxItem: function(){
      return Math.min(
        (this.pageNum + 1) * this.pageLen,
        this.base_comics.length
      )
    },
    comics: function(){
      return this.base_comics.sort((a,b) => {
        var result = 0;
        var direction = 0;

        if(this.sortDirection === 'asc') direction = 1;
        else if(this.sortDirection === 'desc') direction = -1;

        if(a[this.sortBy] < b[this.sortBy]) result = -1;
        else if(a[this.sortBy] > b[this.sortBy]) result = 1;

        return result * direction;
      }).slice(this.minItem - 1, this.maxItem);
    }
  }
});

invoke = (event) => {
  var id = event.getAttribute('id');
  window.location.href='/comic/'+id;
}

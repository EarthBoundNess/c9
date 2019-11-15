var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    definition: [],
    prefix: '',
    prefix2: ''
  },
  methods: {
    fetchREST() {
      var url = "/getcity?q="+$("#cityfield").val();
      $.getJSON(url,function(data) {
          return data;
        })
        .then((citylist) => {
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            this.cities.push({ name: citylist[i].city });
          };
        });
    },
    fetchProxy() {
      var url = "/owlPath?q="+$("#deffield").val();
      $.getJSON(url,function(data) {
        return data;
      })
      .then((deflist) => {
        this.definition = [];
        for (let i = 0; i < deflist.length; i++) {
          if (deflist[i].type != null) { this.definition.push({ text: deflist[i].type }); }
          if (deflist[i].defenition != null) { this.definition.push({ text: deflist[i].defenition }); } //yes it is spelled that way in their api. lmao
          if (deflist[i].example != null) { this.definition.push({ text: '"' + deflist[i].example + '"' }); }
        };
      });
    }
  },
});

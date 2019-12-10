var app = new Vue({
  el: '#admin',
  data: {
    name: "",
    price: null,
    url: "",
    addItem: null,
    items: []
  },
  created() {
    this.getItems();
  },
  methods: {
    getItem(name) {
      for (let i = 0; i < this.items.length; i++) {
        if (name === this.items[i].name) {
              return this.items[i];
            }
      }
    },
    async upload() {
      try {
        let r1 = await axios.post('/api/items', {
          name: this.name,
          price: this.price,
          url: this.url
        });
        this.addItem = r1.data;
        this.items.push(this.addItem);
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        
        let array = [];
        for (let i = 0; i < this.items.length; i++) {
          array.push(this.items[i].name);
        }
        array.sort();
        
        let sortedItems = [];
        for (let i = 0; i < array.length; i++) {
          sortedItems.push(this.getItem(array[i]));
        }
        this.items = sortedItems;
        
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
});

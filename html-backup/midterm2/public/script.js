var app = new Vue({
  el: '#app',
  data: {
    checkedItems: [],
    items: [],
    item: {},
    cart: null
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
    async purchase() {
      try {
        this.cart = [];  
        for (let i = 0; i < this.checkedItems.length; i++) {
          this.item = this.getItem(this.checkedItems[i]);
          this.cart.push(this.item);
          let response = axios.put("/api/items/" + this.item._id);
          console.log(this.cart);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
});
Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
  },
  computed: {
    month() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    },
    average() {
        if (!(this.number in this.ratings))
            return '-';
        else
            return parseFloat((this.ratings[this.number].sum / this.ratings[this.number].total).toFixed(1)).toString();
    }
  },
  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    },
  },
  created() {
    this.xkcd();
  },
  methods: {
    async xkcd() {
      try {
        this.loading = true;
        const response = await axios.get('https://xkcdapi.now.sh/' + this.number);
        this.current = response.data;
        this.loading = false;
        this.number = response.data.num;
      } catch (error) {
        console.log(error);
        this.number = this.max;
      }
    },
    firstComic() {
      this.number = 1;
    },
    previousComic() {
      this.number = this.current.num - 1;
      if (this.number < 1)
        this.number = 1;
    },
    nextComic() {
      this.number = this.current.num + 1;
      if (this.number > this.max)
        this.number = this.max
    },
    lastComic() {
      this.number = this.max;
    },
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic() {
      this.number = this.getRandom(1, this.max);
    },
    setRating(rating){
      if (!(this.number in this.ratings))
        Vue.set(this.ratings, this.number, {
          sum: 0,
          total: 0
        });
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].total += 1;
    },
    addComment() {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({
        author: this.addedName + ', ' + moment().format("h:mm a MMM D YYYY"),
        text: this.addedComment
      });
      this.addedName = '';
      this.addedComment = '';
    },
  }
});
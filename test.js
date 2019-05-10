i = { a: 1, b: 2, c: 3, d: function(){return this.a}  };
const { a, b, c } = i;
console.log(i.d());

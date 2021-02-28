const say = _ => console.log(_);

let promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log(`promise end`);
    console.log(promise);
  }, 1000)
});

say("Hello webpack with html and js optimize");
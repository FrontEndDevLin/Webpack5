const hello = () => {
  return console.log("Hello webpack corejs");
}

let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
    console.log(promise);
  }, 1000)
});

hello();
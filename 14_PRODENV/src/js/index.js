import "../css/index.css";
import "../css/style.less";
import "../font/iconfont.css";

console.log("Hello webpack prod env");

let p = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000)
  })
}

let promise = p().then(v => {
  console.log("promise 执行完");
  console.log(promise);
})
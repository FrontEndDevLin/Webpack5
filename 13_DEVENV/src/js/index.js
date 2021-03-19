import "../css/index.css";
import "../css/index.less";
import "../font/iconfont.css";

console.log("Hello webpack development");

let p = function () {
    return new Promise((resolve) => {
        setTimeout(_ => {
            resolve(1)
        }, 1000)
    })
}

let promise = p().then((v) => {
    console.log("promise执行了");
    console.log(promise);
})
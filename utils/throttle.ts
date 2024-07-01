/**
 * 节流函数
 * @param fun
 * @param wait
 * @returns
 */
 export function throttle(fun: Function, wait: number = 1000) {
    let timers: any;
    return function () {
      if (!timers) {
        timers = setTimeout(() => {
          fun();
          timers = null;
        }, wait);
      }
    };
  }
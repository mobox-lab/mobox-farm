export default class Common {
  static app = null;
  static store = null;
  static walletConnectConnector = null;

  //
  static getHashrateByStep(lv, step) {
    switch (lv) {
      case 4:
        return (((step - 8) / 2) * 10 + ((step - 2) * 10 + 80)) / 2;
      case 5:
        return (((step - 8) / 2) * 10 + ((step - 2) * 10 + 150)) / 2;
      case 6:
        return (step - 1) * 10 + 90;
    }
  }

  static debounce(fun, waitTime = 500) {
    let timeout = null;
    return function () {
      const self = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fun.apply(self, Array.prototype.slice.call(arguments));
      }, waitTime);
    };
  }

  static getUrlParms(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  static numFloor(num, decimals = 100) {
    return Number(Math.floor(num * decimals + 0.0000002) / decimals);
  }
  static getShortAddr(addr) {
    if (typeof addr != "string") return "";
    return (
      addr.substr(0, 6) + "..." + addr.substr(addr.length - 4, addr.length)
    );
  }
  static repeat(target, n) {
    if (n == 1) return target;
    var s = this.repeat(target, Math.floor(n / 2));
    s += s;
    if (n % 2) s += target;
    return s;
  }
  static setStorageItem(name, value) {
    window.localStorage.setItem(name, value);
  }
  static getStorageItem(name) {
    return window.localStorage.getItem(name);
  }
  static removeStorageItem(name) {
    window.localStorage.removeItem(name);
  }
  static getRandomNum(start, end) {
    return parseInt(Math.random() * (end - start + 1) + start, 10);
  }
  static async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //
  static dateFtt(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  static async oprDialog(domId, type) {
    let dom = document.getElementById(domId);
    if (type == "none") {
      dom.classList.add("yf-dialog-remove");
      await Common.sleep(200);
    }
    dom.classList.remove("yf-dialog-remove");
    dom.style.display = type;
  }

  //
  static ObjClone(obj) {
    if (null == obj || "object" != typeof obj) return obj;

    let copy = null;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    // Handle Array or Object
    if (obj instanceof Array || obj instanceof Object) {
      if (obj.updateTs != undefined) {
        copy = obj instanceof Array ? [...obj] : { ...obj };
        copy.updateTs = obj.updateTs;
        return copy;
      }
      copy = obj instanceof Array ? [] : {};
      for (var attr in obj) {
        if (Object.hasOwnProperty.call(obj, attr))
          copy[attr] = this.ObjClone(obj[attr]);
      }
      return copy;
    }
    throw new Error("Unable to clone obj! Its type isn't supported.");
  }
}

import Vue from "vue";
export default () => {
  Vue.directive("int", {
    bind: function (input) {
      input.onkeyup = function () {
        let max = input.getAttribute("data-max");
        let min = input.getAttribute("data-min");
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^0-9]/g, "");
        } else {
          input.value = input.value.replace(/[^\d]/g, "");
        }
        if (
          max != null &&
          Number(input.value) > Number(max) &&
          input.value != ""
        ) {
          input.value = max;
        }
        if (
          min != null &&
          Number(input.value) < Number(min) &&
          input.value != ""
        ) {
          input.value = min;
        }
        trigger(input, "input");
      };
      input.onblur = function () {
        let max = input.getAttribute("data-max");
        let min = input.getAttribute("data-min");
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^0-9]/g, "");
        } else {
          input.value = input.value.replace(/[^\d]/g, "");
        }
        if (
          max != null &&
          Number(input.value) > Number(max) &&
          input.value != ""
        ) {
          input.value = max;
        }
        if (
          min != null &&
          Number(input.value) < Number(min) &&
          input.value != ""
        ) {
          input.value = min;
        }
        trigger(input, "input");
      };
    },
  });
  Vue.directive("number", {
    bind: function (input) {
      input.onkeyup = function () {
        let max = input.getAttribute("data-max");
        let min = input.getAttribute("data-min");
        input.value = numberCheck(input.value);
        if (
          max != null &&
          Number(input.value) > Number(max) &&
          input.value != ""
        ) {
          input.value = max;
        }
        if (
          min != null &&
          Number(input.value) < Number(min) &&
          input.value != ""
        ) {
          input.value = min;
        }
        trigger(input, "input");
      };
      input.onblur = function () {
        let max = input.getAttribute("data-max");
        let min = input.getAttribute("data-min");
        input.value = numberCheck(input.value);
        if (
          max != null &&
          Number(input.value) > Number(max) &&
          input.value != ""
        ) {
          input.value = max;
        }
        if (
          min != null &&
          Number(input.value) < Number(min) &&
          input.value != ""
        ) {
          input.value = min;
        }
        trigger(input, "input");
      };
    },
  });

  Vue.directive("popMsg", {
    bind: function (ele) {
      let popMsgNode = ele.querySelector(".popMsg");
      popMsgNode.setAttribute("tabindex", 1);
      ele.onmouseenter = function () {
        popMsgNode.style.display = "block";
        popMsgNode.focus();
      };
      ele.onmouseleave = function () {
        popMsgNode.style.display = "none";
      };
      ele.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          popMsgNode.style.display = "block";
        },
        true
      );

      ele.addEventListener(
        "touchstart",
        (e) => {
          e.stopPropagation();
          popMsgNode.style.display = "block";
        },
        true
      );
    },
  });
};

const numberCheck = (num) => {
  let str = num;
  let len1 = str.substr(0, 1);
  let len2 = str.substr(1, 1);
  //
  if (str.length > 1 && len1 == 0 && len2 != ".") {
    str = str.substr(1, 1);
  }
  //
  if (len1 == ".") {
    str = "";
  }
  //
  if (str.indexOf(".") != -1) {
    let str_ = str.substr(str.indexOf(".") + 1);
    if (str_.indexOf(".") != -1) {
      str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
    }
  }
  //
  str = str.replace(/[^\d^\\.]+/g, "");
  //
  // str = str.replace(/\\.\d\d$/,'');
  return str;
};

const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

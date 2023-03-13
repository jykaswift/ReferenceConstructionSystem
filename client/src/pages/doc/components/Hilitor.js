export default function Hilitor(id, tag) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  // private variables
  const targetNode = document.getElementById(id) || document.body;
  const hiliteTag = tag || "MARK";
  const skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  const colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  const wordColor = [];
  let colorIdx = 0;
  let matchRegExp = "";
  // characters to strip from start and end of the input string
  let endRegExp = new RegExp("^[^\\wА-я]+|[^\\wА-я]+$", "g");

  // characters used to break up the input string into words
  let breakRegExp = new RegExp("[^\\w'-]+", "g");

  this.setEndRegExp = function (regex) {
    endRegExp = regex;
    return endRegExp;
  };

  this.setBreakRegExp = function (regex) {
    breakRegExp = regex;
    return breakRegExp;
  };

  this.setMatchType = function (type) {
    switch (type) {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;

      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;

      case "open":
        this.openLeft = this.openRight = true;
        break;

      default:
        this.openLeft = this.openRight = false;
    }
  };

  this.setRegex = function (input) {
    input = input.replace(endRegExp, "");
    console.log(input);
    input = input.replace(breakRegExp, "|");
    console.log(input);
    input = input.replace(/^\||\|$/g, "");
    console.log(input);
    if (input) {
      let re = "(" + input + ")";
      if (!this.openLeft) {
        re = "\\b" + re;
      }
      if (!this.openRight) {
        re = re + "\\b";
      }
      matchRegExp = new RegExp(re, "i");
      return matchRegExp;
    }
    return false;
  };

  this.getRegex = function () {
    let retval = matchRegExp.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function (node) {
    if (node === undefined || !node) return;
    if (!matchRegExp) return;
    if (skipTags.test(node.nodeName)) return;

    if (node.hasChildNodes()) {
      for (var i = 0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if (node.nodeType == 3) {
      // NODE_TEXT

      let nv, regs;

      if ((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
        if (!wordColor[regs[0].toLowerCase()]) {
          wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        }

        const match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.color = "#000";

        const after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    }
  };

  // remove highlighting
  this.remove = function () {
    let arr = document.getElementsByTagName(hiliteTag),
      el;
    while (arr.length && (el = arr[0])) {
      const parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  };

  // start highlighting at target node
  this.apply = function (input) {
    this.remove();

    if (input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
      return;
    }
    if (this.setRegex(input)) {
      this.hiliteWords(targetNode);
    }
    return matchRegExp;
  };
}

export default function Highlighter(id, tag) {
  const targetNode = document.getElementById(id) || document.body;
  const hiliteTag = tag || "MARK";
  const skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  let matchRegExp = "";
  let endRegExp = new RegExp("^[^\\wА-я]+|[^\\wА-я]+$", "g");

  let breakRegExp = new RegExp("[^\\w'А-я-]+", "g");

  this.setRegex = function (input) {
    input = input.replace(endRegExp, "");
    input = input.replace(breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if (input) {
      let re = "(" + input + ")";

      matchRegExp = new RegExp(re, "i");
      return matchRegExp;
    }
    return false;
  };

  this.hiliteWords = function (node) {
    if (node === undefined || !node) return;
    if (!matchRegExp) return;
    if (skipTags.test(node.nodeName)) return;

    if (node.hasChildNodes()) {
      for (var i = 0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if (node.nodeType === 3) {
      let nv, regs;
      if ((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
        const match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = "#ff6";
        match.style.color = "#000";

        const after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    }
  };

  this.remove = function () {
    let arr = document.getElementsByTagName(hiliteTag),
      el;
    while (arr.length && (el = arr[0])) {
      const parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  };

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

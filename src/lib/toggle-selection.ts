export default function toggleSelection() {
  const selection = document.getSelection();
  if (!selection?.rangeCount) {
    return function () {};
  }
  let active = <HTMLElement | null>document.activeElement;

  const ranges: Range[] = [];
  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (
    active?.tagName.toUpperCase() // .toUpperCase handles XHTML
  ) {
    case "INPUT":
    case "TEXTAREA":
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    if (selection.type === "Caret") selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }
    if (active) {
      active.focus();
    }
  };
}

import toggleSelection from "./toggle-selection";

export function format(message: string) {
  const copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

export function copy(
  text: string,
  options?: {
    debug?: boolean;
    format?: string;
    onCopy?(data: DataTransfer | null): void;
  }
) {
  let reselectPrevious,
    range,
    selection,
    success = false;
  let mark;
  if (!options) {
    options = {};
  }
  const debug = options?.debug || false;
  try {
    reselectPrevious = toggleSelection();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = "0px";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") {
          // IE 11
          if (debug) {
            console.warn("unable to use e.clipboardData");
            console.warn("trying IE specific stuff");
          }
        } else {
          // all other browsers
          e.clipboardData?.clearData();
          e.clipboardData?.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection?.addRange(range);

    const successful = document?.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    if (debug) {
      console.error("unable to copy using execCommand: ", err);
      console.warn("trying IE specific stuff");
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function" && range) {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    if (reselectPrevious) reselectPrevious();
  }

  return success;
}

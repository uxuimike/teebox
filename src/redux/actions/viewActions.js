export function setSize(w, h) {
  return {
    type: "CHANGE_SIZE",
    payload: {
      width: w,
      height: h
    }
  }
}

export function setScroll(st) {
  return {
    type: "CHANGE_SCROLL",
    payload: {
      scrollTop: st
    }
  }
}

export function regSection(off, sec, bs) {
  return {
    type: "REG_SECTION",
    payload: {
      section: {offset: off, section: sec, slide: bs}
    }
  }
}

export function setStyle(style, section) {
  return {
    type: "CHANGE_STYLE",
    payload: {
      style: style,
      section: section
    }
  }
}

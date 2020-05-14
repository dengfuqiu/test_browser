const EOF = Symbol('EOF');

function emit(token) {
  if (token.type !== 'text') {
    console.log('token :>> ', token);
  }
}

function data(c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    return ;
  } else {
    return data;
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else {
    return ;
  }
}

function endTagOpen(c) {
  
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return selfClosingStarTTag;
  }
}

function selfClosingStarTTag(c) {
  
}


module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (const c of html) {
    state = state(c);
  }
  state = state(EOF);
}

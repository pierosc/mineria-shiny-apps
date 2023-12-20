export const print = (text) => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;
  if (godMode === "true") {
    console.log(text);
  }
};

export const printTitle = (text) => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;
  let string = "━".repeat(text.length);
  if (godMode === "true") {
    console.log("┏━━━" + string + "━━━┓");
    console.log("┃   " + text + "   ┃");
    console.log("┗━━━" + string + "━━━┛");
  }
};

export const printGroup = (text) => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;

  if (godMode === "true") {
    console.group(text);
  }
};

export const printEnd = () => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;
  if (godMode === "true") {
    console.groupEnd();
  }
};

export const printCollapsed = (text) => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;
  if (godMode === "true") {
    console.groupCollapsed(text);
  }
};

export const printVarGroup = (obj) => {
  const godMode = `${process.env.REACT_APP_GOD_MODE}`;
  if (godMode === "true") {
    Object.values(obj).map((v, index) =>
      console.log(Object.keys(obj)[index] + ": " + v)
    );
  }
};

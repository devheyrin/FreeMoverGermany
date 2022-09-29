import React, { useCallback } from "https://cdn.skypack.dev/react@17";
import { render } from "https://cdn.skypack.dev/react-dom@17";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

function App() {
  const onClick = useCallback(() => {
    confetti({
      particleCount: 300,
      spread: 80 });

  }, []);

  return /*#__PURE__*/(
    React.createElement("button", { className: "button", onClick: onClick }, /*#__PURE__*/
    React.createElement("span", null, "\uD83C\uDF89"), /*#__PURE__*/
    React.createElement("span", null, "학교 선택 완료!")));


}

render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
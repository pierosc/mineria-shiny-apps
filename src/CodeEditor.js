import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
const CodeEditor = ({ codeString }) => {
  const [copy, setCopy] = useState();

  return (
    <div
      className="max-w-x2l min-w-[25rem] bg-[#3a404d] rounded-md
      overflow-hidden
      "
    >
      <div className="flex justify-between px-4 text-white text-xs items-center">
        <p className="text-sm">Example code</p>
        {copy ? (
          <button className="py-1 inline-flex items-center gap-1">
            <span className="text-base mt-1">
              <CheckIcon />
            </span>
            Copiado
          </button>
        ) : (
          <button
            className="py-1 inline-flex items-center gap-1"
            onClick={() => {
              navigator.clipboard.writeText(codeString);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}
          >
            <span className="text-base mt-1">
              <ContentCopyIcon />
            </span>
            Copiar Código
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language="r"
        style={atomOneDark}
        customStyle={{
          padding: "25px",
        }}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeEditor;

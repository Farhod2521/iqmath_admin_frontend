import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

type Props = {
  content: string;
};

const MathText = ({ content }: Props) => {
  if (!content) return null;

  return (
    <MathJaxContext>
      <MathJax dynamic>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </MathJax>
    </MathJaxContext>
  );
};

export default MathText;

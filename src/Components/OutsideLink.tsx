import React, { FunctionComponent } from "react";
import { shell } from "electron";

type OutsideLinkProps = {
  src: string;
  text: string;
  className?: string;
};

const OutsideLink: FunctionComponent<OutsideLinkProps> = ({
  src,
  text,
  className,
}) => {
  return (
    <a
      data-testid="link"
      className={className}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        shell.openExternal(src);
      }}
    >
      {text}
    </a>
  );
};

export default OutsideLink;

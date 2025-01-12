import React from "react";
import { PageFlip } from "page-flip";
import type { PartialFlipSetting, EventProps } from "./settings";
type HTMLFlipBook = PartialFlipSetting & EventProps & {
    children: React.ReactNode;
    className?: string;
    ref?: React.Ref<PageFlip>;
    renderOnlyPageLengthChange?: boolean;
    style?: React.CSSProperties;
};
declare const HTMLFlipBook: (props: HTMLFlipBook) => React.JSX.Element;
export default HTMLFlipBook;

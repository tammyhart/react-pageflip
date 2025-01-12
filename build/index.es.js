import React, { useRef, useState, useCallback, useEffect } from 'react';
import { PageFlip, SizeType } from 'page-flip';

const HTMLFlipBook = (props) => {
    const htmlElementRef = useRef(null);
    const childRef = useRef([]);
    const pageFlip = useRef(null);
    const [pages, setPages] = useState([]);
    const refreshOnPageDelete = useCallback(() => {
        if (pageFlip.current) {
            pageFlip.current.destroy();
        }
    }, []);
    const removeHandlers = useCallback(() => {
        const flip = pageFlip.current;
        if (flip) {
            flip.off("flip");
            flip.off("changeOrientation");
            flip.off("changeState");
            flip.off("init");
            flip.off("update");
        }
    }, []);
    useEffect(() => {
        var _a;
        childRef.current = [];
        if (props.children) {
            const childList = (_a = React.Children.map(props.children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ref: (dom) => {
                            if (dom) {
                                childRef.current.push(dom);
                            }
                        },
                    });
                }
                return null;
            })) !== null && _a !== undefined ? _a : [];
            if (!props.renderOnlyPageLengthChange ||
                pages.length !== childList.length) {
                if (childList.length < pages.length) {
                    refreshOnPageDelete();
                }
                setPages(childList);
            }
        }
    }, [props.children]);
    useEffect(() => {
        var _a, _b;
        const setHandlers = () => {
            const flip = pageFlip.current;
            if (flip) {
                flip.on("flip", e => {
                    if (props.onFlip) {
                        props.onFlip(e);
                    }
                });
                flip.on("changeOrientation", e => {
                    if (props.onChangeOrientation) {
                        props.onChangeOrientation(e);
                    }
                });
                flip.on("changeState", e => {
                    if (props.onChangeState) {
                        props.onChangeState(e);
                    }
                });
                flip.on("init", e => {
                    if (props.onInit) {
                        props.onInit(e);
                    }
                });
                flip.on("update", e => {
                    if (props.onUpdate) {
                        props.onUpdate(e);
                    }
                });
            }
        };
        if (pages.length > 0 && childRef.current.length > 0) {
            removeHandlers();
            if (htmlElementRef.current && !pageFlip.current) {
                pageFlip.current = new PageFlip(htmlElementRef.current, Object.assign(Object.assign({}, props), { size: props.size === "fixed" ? SizeType.FIXED : SizeType.STRETCH }));
            }
            if (!((_a = pageFlip.current) === null || _a === undefined ? undefined : _a.getFlipController())) {
                (_b = pageFlip.current) === null || _b === undefined ? undefined : _b.loadFromHTML(childRef.current);
            }
            else {
                pageFlip.current.updateFromHtml(childRef.current);
            }
            setHandlers();
        }
    }, [pages]);
    return (React.createElement("div", { ref: htmlElementRef, className: props.className, style: props.style }, pages));
};

export { HTMLFlipBook as default };
//# sourceMappingURL=index.es.js.map

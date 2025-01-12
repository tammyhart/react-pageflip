'use strict';

var React = require('react');
var pageFlip = require('page-flip');

var SizeType;
(function (SizeType) {
    /** Dimensions are fixed */
    SizeType["FIXED"] = "fixed";
    /** Dimensions are calculated based on the parent element */
    SizeType["STRETCH"] = "stretch";
})(SizeType || (SizeType = {}));
const HTMLFlipBook = (props) => {
    const htmlElementRef = React.useRef(null);
    const childRef = React.useRef([]);
    const pageFlip$1 = React.useRef(null);
    const [pages, setPages] = React.useState([]);
    const refreshOnPageDelete = React.useCallback(() => {
        if (pageFlip$1.current) {
            pageFlip$1.current.destroy();
        }
    }, []);
    React.useImperativeHandle(props.ref, () => pageFlip$1.current);
    const removeHandlers = React.useCallback(() => {
        const flip = pageFlip$1.current;
        if (flip) {
            flip.off("flip");
            flip.off("changeOrientation");
            flip.off("changeState");
            flip.off("init");
            flip.off("update");
        }
    }, []);
    React.useEffect(() => {
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
    React.useEffect(() => {
        var _a, _b;
        const setHandlers = () => {
            const flip = pageFlip$1.current;
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
            if (htmlElementRef.current && !pageFlip$1.current) {
                pageFlip$1.current = new pageFlip.PageFlip(htmlElementRef.current, Object.assign(Object.assign({}, props), { size: props.size === "fixed" ? SizeType.FIXED : SizeType.STRETCH }));
            }
            if (!((_a = pageFlip$1.current) === null || _a === undefined ? undefined : _a.getFlipController())) {
                (_b = pageFlip$1.current) === null || _b === undefined ? undefined : _b.loadFromHTML(childRef.current);
            }
            else {
                pageFlip$1.current.updateFromHtml(childRef.current);
            }
            setHandlers();
        }
    }, [pages]);
    return (React.createElement("div", { ref: htmlElementRef, className: props.className, style: props.style }, pages));
};

module.exports = HTMLFlipBook;
//# sourceMappingURL=index.js.map

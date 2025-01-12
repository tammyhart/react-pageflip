import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { PageFlip, SizeType } from "page-flip"
import type { PartialFlipSetting, EventProps } from "./settings"

type HTMLFlipBook = PartialFlipSetting &
  EventProps & {
    children: React.ReactNode
    className?: string
    ref?: React.Ref<PageFlip>
    renderOnlyPageLengthChange?: boolean
    style?: React.CSSProperties
  }

const HTMLFlipBook = (props: HTMLFlipBook) => {
  const htmlElementRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLElement[]>([])
  const pageFlip = useRef<PageFlip>(null)

  const [pages, setPages] = useState<ReactElement[]>([])

  const refreshOnPageDelete = useCallback(() => {
    if (pageFlip.current) {
      pageFlip.current.destroy()
    }
  }, [])

  const removeHandlers = useCallback(() => {
    const flip = pageFlip.current

    if (flip) {
      flip.off("flip")
      flip.off("changeOrientation")
      flip.off("changeState")
      flip.off("init")
      flip.off("update")
    }
  }, [])

  useEffect(() => {
    childRef.current = []

    if (props.children) {
      const childList =
        React.Children.map(props.children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ref: (dom: HTMLElement) => {
                if (dom) {
                  childRef.current.push(dom)
                }
              },
            } as React.RefAttributes<HTMLElement>)
          }
          return null
        }) ?? []

      if (
        !props.renderOnlyPageLengthChange ||
        pages.length !== childList.length
      ) {
        if (childList.length < pages.length) {
          refreshOnPageDelete()
        }

        setPages(childList)
      }
    }
  }, [props.children])

  useEffect(() => {
    const setHandlers = () => {
      const flip = pageFlip.current

      if (flip) {
        flip.on("flip", e => {
          if (props.onFlip) {
            props.onFlip(e)
          }
        })

        flip.on("changeOrientation", e => {
          if (props.onChangeOrientation) {
            props.onChangeOrientation(e)
          }
        })

        flip.on("changeState", e => {
          if (props.onChangeState) {
            props.onChangeState(e)
          }
        })

        flip.on("init", e => {
          if (props.onInit) {
            props.onInit(e)
          }
        })

        flip.on("update", e => {
          if (props.onUpdate) {
            props.onUpdate(e)
          }
        })
      }
    }

    if (pages.length > 0 && childRef.current.length > 0) {
      removeHandlers()

      if (htmlElementRef.current && !pageFlip.current) {
        pageFlip.current = new PageFlip(htmlElementRef.current, {
          ...props,
          size: props.size === "fixed" ? SizeType.FIXED : SizeType.STRETCH,
        })
      }

      if (!pageFlip.current?.getFlipController()) {
        pageFlip.current?.loadFromHTML(childRef.current)
      } else {
        pageFlip.current.updateFromHtml(childRef.current)
      }

      setHandlers()
    }
  }, [pages])

  return (
    <div ref={htmlElementRef} className={props.className} style={props.style}>
      {pages}
    </div>
  )
}

export default HTMLFlipBook

import type { FlipSetting } from "page-flip"

export type PageState = "user_fold" | "fold_corner" | "flipping" | "read"
export type PageOrientation = "portrait" | "landscape"
export type PageSize = "fixed" | "stretch"

export type PartialFlipSetting = Partial<
  Omit<FlipSetting, "width" | "height" | "size">
> &
  Pick<FlipSetting, "width" | "height"> & { size?: PageSize }

export type IBookState = {
  page: number
  mode: PageOrientation
}

export type EventProps = {
  onFlip?: (flipEvent: any) => void
  onChangeOrientation?: (flipEvent: any) => void
  onChangeState?: (flipEvent: any) => void
  onInit?: (flipEvent: any) => void
  onUpdate?: (flipEvent: any) => void
}

export type ScrollbarOptions = OverlayScrollbars.Options;

export type ScrollbarHandler = (element: HTMLElement, overlay: OverlayScrollbars) => void;

export interface Scrollbar {
  handler: ScrollbarHandler;
  options: ScrollbarOptions;
}

export const DEFAULT_SCROLLBAR_OPTIONS: ScrollbarOptions = {
  overflowBehavior: {
    x: 'visible-hidden'
  },
  scrollbars: {
    autoHide: 'move'
  }
};

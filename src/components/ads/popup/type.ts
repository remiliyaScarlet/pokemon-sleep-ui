export type AdsPopupState = {
  counterWhenShowed: number,
  show: boolean,
  locked: boolean,
};

export type AdsPopupControl = {
  state: AdsPopupState,
  setShow: (show: boolean) => void,
  counter: number,
  increaseCounter: (count: number) => void,
};

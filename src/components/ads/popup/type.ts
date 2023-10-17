export type AdsPopupState = {
  show: boolean,
  locked: boolean,
};

export type AdsPopupControl = {
  state: AdsPopupState,
  setShow: (show: boolean) => void,
};

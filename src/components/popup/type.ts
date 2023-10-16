export type PopupControlCommonProps = {
  setShow: (show: boolean) => void,
  closeDisabled?: boolean,
};

export type PopupProps = PopupControlCommonProps & {
  show: boolean,
};

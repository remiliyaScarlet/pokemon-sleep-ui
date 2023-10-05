export type LayoutProps = {
  noFullWidth?: boolean,
  className?: string,
} & ({
  center: true,
  stretch?: never,
} | {
  center?: never,
  stretch: true,
} | {
  center?: undefined,
  stretch?: undefined,
});

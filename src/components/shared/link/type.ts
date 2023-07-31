export type FeatureLinkProps = {
  href: string,
  disabled?: boolean,
};

export type FeatureLinkImageProps = FeatureLinkProps & {
  imageSrc: string,
};

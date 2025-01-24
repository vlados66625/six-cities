type LogoProps = {
  className: string;
  width: number;
  height: number;
}

export default function Logo({ className, width, height }: LogoProps): JSX.Element {
  return (
    <img className={className} src="img/logo.svg" alt="6 cities logo" width={width} height={height} />
  );
}

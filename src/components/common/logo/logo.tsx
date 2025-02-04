import cn from 'classnames';
import { Link } from 'react-router-dom';

type LogoProps = {
  blockName: string;
  width: number;
  height: number;
  isActive?: boolean;
}

export default function Logo({ blockName, width, height, isActive }: LogoProps): JSX.Element {
  return (
    <Link to='/' className={cn(
      `${blockName}__logo-link`,
      { [`${blockName}__logo-link--active`]: isActive })}
    >
      <img className={`${blockName}__logo`} src="img/logo.svg" alt="6 cities logo" width={width} height={height} />
    </Link >
  );
}

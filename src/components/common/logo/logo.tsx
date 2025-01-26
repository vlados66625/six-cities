import { Link } from 'react-router-dom';

type LogoProps = {
  blockName: string;
  width: number;
  height: number;
  isActive?: boolean;
}

export default function Logo({ blockName, width, height, isActive }: LogoProps): JSX.Element {
  return (
    <Link className={`${blockName}__logo-link ${isActive ? `${blockName}__logo-link--active` : ''}`} to='/'>
      <img className={`${blockName}__logo`} src="img/logo.svg" alt="6 cities logo" width={width} height={height} />
    </Link>
  );
}

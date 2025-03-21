import Logo from '../../common/logo/logo';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer" data-testid="footer">
      <Logo blockName="footer" width={64} height={33} />
    </footer>
  );
}

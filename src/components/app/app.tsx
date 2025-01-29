import Routing from '../../routing';

type AppProps = {
  rentalOffer: number;
}

export default function App({ rentalOffer }: AppProps): JSX.Element {
  return (
    <Routing rentalOffer={rentalOffer} />
  );
}

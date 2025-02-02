type PremiumMarkProps = {
  isPremium: boolean;
}

export default function PremiumMark({ isPremium }: PremiumMarkProps): JSX.Element | null {
  if (isPremium) {
    return (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    );
  }
  return null;
}

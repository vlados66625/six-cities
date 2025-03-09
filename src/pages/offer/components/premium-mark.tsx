import { memo } from 'react';

type PremiumMarkProps = {
  isPremium: boolean;
}

function PremiumMarkContent({ isPremium }: PremiumMarkProps): JSX.Element | null {
  if (isPremium) {
    return (
      <div className="offer__mark" data-testid="premium-mark-container">
        <span>Premium</span>
      </div>
    );
  }
  return null;
}

const PremiumMark = memo(PremiumMarkContent);

export default PremiumMark;

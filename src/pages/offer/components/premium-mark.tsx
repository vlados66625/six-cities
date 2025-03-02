import { memo } from 'react';

type PremiumMarkProps = {
  isPremium: boolean;
}

function PremiumMark({ isPremium }: PremiumMarkProps): JSX.Element | null {
  if (isPremium) {
    return (
      <div className="offer__mark">
        <span>Premium</span>
      </div>
    );
  }
  return null;
}

const PremiumMarkMemo = memo(PremiumMark);

export default PremiumMarkMemo;

import { memo } from 'react';

type AdvantagesProps = {
  advantages: string[];
}

function Advantages({ advantages }: AdvantagesProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {advantages.map((advantage) => (
          <li className="offer__inside-item" key={advantage}>
            {advantage}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AdvantagesMemo = memo(Advantages);

export default AdvantagesMemo;

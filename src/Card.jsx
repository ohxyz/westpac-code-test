export function Card({ patternIndex, rankIndex, onSnap }) {
  const patterns = ['club', 'diamond', 'heart', 'spade'];
  const rank =
    rankIndex === 11
      ? 'J'
      : rankIndex === 12
      ? 'Q'
      : rankIndex === 13
      ? 'K'
      : rankIndex === 1
      ? 'A'
      : rankIndex;

  return (
    <div className="card" onClick={onSnap}>
      <div className="rank-top">{rank}</div>
      <div className={`pattern ${patterns[patternIndex]}`}></div>
      <div className="rank-bottom">{rank}</div>
    </div>
  );
}

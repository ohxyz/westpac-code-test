function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export class Dealer {
  constructor() {
    this.middlePile = [];
    this.playerPile = [];
    this.computerPile = [];

    this.areCardsSame = false;
    this.isStopped = false;
    [this.playerPile, this.computerPile] = this.genCards();
  }

  // When called, all future movement stopped
  stop() {
    this.isStopped = true;
  }
  /**
   * patterns: ['club', 'diamond', 'heart', 'spade']
   * e.g. Club A: [0, 1], Spade K: [3, 13]
   */
  genCards() {
    const all = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        all.push([i, j]);
      }
    }
    shuffleArray(all);

    return [
      all.slice(0, all.length / 2),
      all.slice(all.length / 2, all.length),
    ];
  }

  moveToMiddle(pile) {
    if (this.isStopped) {
      return;
    }

    if (pile.length === 0) {
      throw new Error('Pile is empty!');
    }
    // take out 4, [1,2,3,4] => [1,2,3]
    const exit = pile.pop();
    // take in 4, [5,6,7] = [5,6,7,4]
    this.middlePile.push(exit);
    if (this.middlePile.length > 1) {
      this.areCardsSame =
        this.middlePile[this.middlePile.length - 1][1] ===
        this.middlePile[this.middlePile.length - 2][1];
    }

    if (this.canSnap()) {
      console.log(
        'Can snap!',
        this.middlePile[this.middlePile.length - 1],
        this.middlePile[this.middlePile.length - 2]
      );
    }
  }

  snap(pile) {
    if (this.isStopped) {
      return;
    }
    const newPile = this.middlePile.concat(pile);
    this.middlePile = [];
    this.areCardsSame = false;
    return newPile;
  }

  playerMove() {
    this.moveToMiddle(this.playerPile);
  }

  computerMove() {
    this.moveToMiddle(this.computerPile);
  }

  playerSnap() {
    this.playerPile = this.snap(this.playerPile);
  }

  computerSnap() {
    this.computerPile = this.snap(this.computerPile);
  }

  canSnap() {
    return this.areCardsSame;
  }

  getWinner() {
    if (this.computerPile.length === 0) return 'Player';
    if (this.playerPile.length === 0) return 'Computer';
    return '';
  }

  getInfo() {
    return {
      computerLeft: this.computerPile.length,
      playerLeft: this.playerPile.length,
      middleNow: this.middlePile.length,
      cardOnTop: this.middlePile.length
        ? this.middlePile[this.middlePile.length - 1]
        : null,
    };
  }
}

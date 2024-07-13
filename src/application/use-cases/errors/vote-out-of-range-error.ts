export class VoteOutOfRangeError extends Error {
  constructor() {
    super("Vote must be 0 to 4");
  }
}

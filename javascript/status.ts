export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export class StatusHolder {
  private status: Status;

  constructor(initialStatus = Status.IDLE) {
    this.status = initialStatus;
  }

  get() {
    return this.status;
  }

  set(value: Status) {
    this.status = value;
  }

  is(value: Status) {
    return this.status === value;
  }

  isIdle() {
    return this.is(Status.IDLE);
  }

  isPending() {
    return this.is(Status.PENDING);
  }

  isFulfilled() {
    return this.is(Status.FULFILLED);
  }

  isRejected() {
    return this.is(Status.REJECTED);
  }

  setIdle() {
    this.set(Status.IDLE);
  }

  setPending() {
    this.set(Status.PENDING);
  }

  setFulfilled() {
    this.set(Status.FULFILLED);
  }

  setRejected() {
    this.set(Status.REJECTED);
  }

  toggle() {
    this.set(this.isIdle() ? Status.PENDING : Status.IDLE);
  }

  toString() {
    return this.get();
  }

  valueOf() {
    return this.get();
  }

  toJSON() {
    return {
      status: this.get(),
    };
  }
}
  
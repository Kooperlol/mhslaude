export enum LAUDE {
  CUM_LAUDE = "Cum Laude",
  MAGNA_CUM_LAUDE = "Magna Cum Laude",
  SUMMA_CUM_LAUDE = "Summa Cum Laude",
}

export function toLatin(laude: LAUDE): string {
  switch (laude) {
    case LAUDE.CUM_LAUDE: {
      return "With Honor";
    }
    case LAUDE.MAGNA_CUM_LAUDE: {
      return "With Great Honor";
    }
    case LAUDE.SUMMA_CUM_LAUDE: {
      return "With Greatest Honor";
    }
  }
}

export function toPoints(laude: LAUDE): string {
  switch (laude) {
    case LAUDE.CUM_LAUDE: {
      return "20 - 39.99";
    }
    case LAUDE.MAGNA_CUM_LAUDE: {
      return "40 - 59.99";
    }
    case LAUDE.SUMMA_CUM_LAUDE: {
      return "60+";
    }
  }
}

export function fromPoints(points: number): LAUDE | null {
  switch (true) {
    case points >= 20 && points < 40:
      return LAUDE.CUM_LAUDE;
    case points >= 40 && points < 60:
      return LAUDE.MAGNA_CUM_LAUDE;
    case points >= 60:
      return LAUDE.SUMMA_CUM_LAUDE;
    default:
      return null;
  }
}

export function toNumeralPoints(status: LAUDE): number | null {
  switch (status) {
    case LAUDE.CUM_LAUDE:
      return 20;
    case LAUDE.MAGNA_CUM_LAUDE:
      return 40;
    case LAUDE.SUMMA_CUM_LAUDE:
      return 60;
    default:
      return null;
  }
}

export function getNextLaudeStatus(currentStatus: LAUDE): LAUDE | null {
  switch (currentStatus) {
    case LAUDE.CUM_LAUDE:
      return LAUDE.MAGNA_CUM_LAUDE;
    case LAUDE.MAGNA_CUM_LAUDE:
      return LAUDE.SUMMA_CUM_LAUDE;
    case LAUDE.SUMMA_CUM_LAUDE:
      return null;
    default:
      return null;
  }
}

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

export function fromPoints(points: number): LAUDE {
  if (points >= 20 && points <= 39.999) {
    return LAUDE.CUM_LAUDE;
  } else if (points >= 40 && points <= 59.999) {
    return LAUDE.MAGNA_CUM_LAUDE;
  } else {
    return LAUDE.SUMMA_CUM_LAUDE;
  }
}

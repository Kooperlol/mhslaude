export enum Laude {
    CUM_LAUDE = "Cum Laude",
    MAGNA_CUM_LAUDE = "Magna Cum Laude",
    SUMMA_CUM_LAUDE = "Summa Cum Laude"
}

export function toLatin(laude: Laude) : string {
    switch(laude) {
        case Laude.CUM_LAUDE: {
            return "With Honor";
        }
        case Laude.MAGNA_CUM_LAUDE: {
            return "With Great Honor";
        }
        case Laude.SUMMA_CUM_LAUDE: {
            return "With Greatest Honor";
        }
    }
}
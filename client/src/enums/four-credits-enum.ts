export enum FOUR_CREDITS {
  ART = "art",
  BUSINESS = "business",
  AGRICULTURE = "agriculture science",
  COMPUTER = "computer science and digital techonology",
  BAND = "band",
  CHOIR = "choir",
  TECHONOLOGY = "techonology and engineering",
  LANGUAGE = "world language",
}

export function getSubjectClasses(course: FOUR_CREDITS): string {
  switch (course) {
    case FOUR_CREDITS.ART:
      return `Exploring Art, Art Foundations I, Art Foundations II, Drawing, Painting, Ceramics I, Ceramics II, Advanced Drawing, Advanced Painting, and AP 2-D Art and Design`;
    case FOUR_CREDITS.BUSINESS:
      return `Introduction to Business and Marketing, Computers In the Workplace, Entrepreneurship, Principles of Marketing, Business Law, Sports and Entertainment Management, Introduction to Accounting, Intermediate Accounting, Advanced Accounting, International Business, Retail Design (School Store) (Fall), Retail Communications (School Store) (Winter), Retail Management (School Store) (Spring), and Financial Lit & Employability Skills (FLES)`;
    case FOUR_CREDITS.AGRICULTURE:
      return `Exploring Animals and Plants, Exploring Food and Wisconsin Agriculture, Vet Science I, Vet Science II, Plant Science (AS), Wildlife Ecology - Fish and Birds, Wildlife Ecology - Mammals, Large Animal Science, Ag Independent Study, and Ag Business Management & Leadership`;
    case FOUR_CREDITS.COMPUTER:
      return `Introduction to Computer Science, IT Fundamentals, Computer Programming, AP Computer Science A, AP Computer Science Principles (PLTW), Cybersecurity (PLTW), Digital Media I, Digital Media II, Media Production, Game Design I, Video Production I, Video Production II, and Web Design`;
    case FOUR_CREDITS.BAND:
      return `AP Music Theory, Chamber Ensemble, Symphonic Band, and Wind Ensemble`;
    case FOUR_CREDITS.CHOIR:
      return `Women’s Show Choir (Octave Above), Mixed Concert Choir, Mixed Show Choir (Choralation), and Chamber Choir`;
    case FOUR_CREDITS.TECHONOLOGY:
      return `Introduction to Engineering Design (PLTW), Principles of Engineering (PLTW), AP Computer Science Principles, Exploring the Trades: CAD and Woods (Fall), Exploring the Trades: Woods and Metals (Winter), Exploring the Trades: Metals and Engineering (Spring), Home and Auto Maintenance, Engines I, Engines II, Introduction to Furniture Making, Introduction to Cabinet Making, Introduction to Construction: Framing Floors, Walls, and Roofs, Introduction to Construction: Exterior and Interior Finishing, Metals I, Metals II, Furniture and Cabinet Making, Construction Trades I (2-hrs), Construction Trades II  (2-hrs), Engines Troubleshooting, Engines Restoration, Metals III, Metals Fabrication, and Gas Metal Arc Welding (TC)  (2-Hrs), Metals Independent Study`;
    case FOUR_CREDITS.LANGUAGE:
      return `French III, Honors French III, French IV, AP French Language and Culture, Spanish in the Medical Field, Spanish I, Spanish II, Spanish III, Advanced Spanish Foundations, Spanish IV, and AP Spanish Language and Culture`;
  }
}

export interface DisplayText {
  language: string; // "en";
  text: string; // "Standard Tariff";
}

export enum PowerType {
  AC = "AC",
  AC_1_PHASE = "AC_1_PHASE",
  AC_3_PHASE = "AC_3_PHASE",
  DC = "DC",
}

export enum CountryIso3166Alpha3 {
  AUT = "AUT", // Östereich
  BEL = "BEL", // Belgien
  CHE = "CHE", // Schweiz
  CZE = "CZE", // Tschechien
  DEU = "DEU", // Deutschland
  DNK = "DNK", // Dänemark
  // ITA = "ITA", // Italien
  FRA = "FRA", // Frankreich
  LIE = "LIE", // Liechtenstein
  LUX = "LUX", // Luxemburg
  NLD = "NLD", // Niederlande
  POL = "POL", // Polen
  // SWE = "SWE", // Schweden
}

export enum Standard {
  CHADEMO = "CHADEMO",
  DOMESTIC_A = "DOMESTIC_A",
  DOMESTIC_B = "DOMESTIC_B",
  DOMESTIC_C = "DOMESTIC_C",
  DOMESTIC_D = "DOMESTIC_D",
  DOMESTIC_E = "DOMESTIC_E",
  DOMESTIC_F = "DOMESTIC_F",
  DOMESTIC_I = "DOMESTIC_I",
  DOMESTIC_J = "DOMESTIC_J",
  DOMESTIC_K = "DOMESTIC_K",
  DOMESTIC_L = "DOMESTIC_L",
  TESLA_R = "TESLA_R",
  TESLA_S = "TESLA_S",
  IEC_62196_1 = "IEC_62196_1",
  IEC_62196_T1 = "IEC_62196_T1",
  IEC_62196_T2 = "IEC_62196_T2",
  IEC_62196_T2_COMBO = "IEC_62196_T2_COMBO",
  IEC_62196_T3A = "IEC_62196_T3A",
  IEC_62196_T3C = "IEC_62196_T3C",
  IEC_60309_2_single_16 = "IEC_60309_2_single_16",
  IEC_60309_2_three_16 = "IEC_60309_2_three_16",
  IEC_60309_2_three_32 = "IEC_60309_2_three_32",
  IEC_60309_2_three_64 = "IEC_60309_2_three_64",
}

export interface Connector {
  amperage: number | null;
  city: string;
  country: CountryIso3166Alpha3;
  dataSource: string;
  evseId: string;
  externalId: string;
  id: string;
  lat: number;
  lng: number;
  postalCode: string;
  power: number;
  powerType: PowerType;
  sanitizedEvseId: string;
  standard: Standard;
  street: string;
  voltage: number | null;
}

export enum CurrencyISO4217 {
  CZK = "CZK",
  DKK = "DKK",
  EUR = "EUR",
  HUF = "HUF",
  NOK = "NOK",
  PLN = "PLN",
  CHF = "CHF",
}

export interface TariffElement {
  price_components: PriceComponent[];
  restrictions?: TariffRestrictions;
}

export enum TariffDimensionType {
  ENERGY = "ENERGY", //	defined in kWh, step_size multiplier: 1 Wh
  FLAT = "FLAT", //	flat fee, no unit
  PARKING_TIME = "PARKING_TIME", //	time not charging: defined in hours, step_size multiplier: 1 second
  TIME = "TIME", //	time charging: defined in hours, step_size multiplier: 1 second
  BLOCKING_TIME = "BLOCKING_TIME",
}

export interface PriceComponent {
  type: TariffDimensionType;
  price: number; // price per unit (excluding VAT) for this tariff dimension
  step_size: number; // Minimum amount to be billed. This unit will be billed in this step_size blocks. For example: if type is time and step_size is 300, then time will be billed in blocks of 5 minutes, so if 6 minutes is used, 10 minutes (2 blocks of step_size) will be billed.
}

export enum DayOfWeek {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export interface TariffRestrictions {
  start_time?: string; // (5)	?	Start time of day, for example 13:30, valid from this time of the day. Must be in 24h format with leading zeros. Hour/Minute separator: ":" Regex: [0-2][0-9]:[0-5][0-9]
  end_time?: string; // (5)	?	End time of day, for example 19:45, valid until this time of the day. Same syntax as start_time
  start_date?: string; // (10)	?	Start date, for example: 2015-12-24, valid from this day
  end_date?: string; // (10)	?	End date, for example: 2015-12-27, valid until this day (excluding this day)
  min_kwh?: number; // 	?	Minimum used energy in kWh, for example 20, valid from this amount of energy is used
  max_kwh?: number; // 	?	Maximum used energy in kWh, for example 50, valid until this amount of energy is used
  min_power?: number; // 	?	Minimum power in kW, for example 0, valid from this charging speed
  max_power?: number; // 	?	Maximum power in kW, for example 20, valid up to this charging speed
  min_duration?: number; // 	?	Minimum duration in seconds, valid for a duration from x seconds
  max_duration?: number; // 	?	Maximum duration in seconds, valid for a duration up to x seconds
  day_of_week?: DayOfWeek; //	*	Which day(s) of the week this tariff is valid
}

export enum Network {
  DEFAULT = "DEFAULT",
  ROAMING = "ROAMING",
  IONITY = "IONITY",
}

export enum TariffType {
  ROAMING = "ROAMING",
  STANDARD = "STANDARD",
  INDIVIDUAL = "INDIVIDUAL",
  IONITY = "IONITY",
}

export interface TariffDescription {
  id: string; // (36)	1	Uniquely identifies the tariff within the CPOs platform (and suboperator platforms).
  providerId: string;
  tariff_alt_text: DisplayText[]; // 	*	List of multi language alternative tariff info text
  tariff_alt_url?: string; // 	?	Alternative URL to tariff info
  createDate: Date;
  updateDate: Date;
  internalTariffName: string;
}

export interface Tariff {
  id: string;
  providerId: string;
  currency: CurrencyISO4217; // (3)	1	Currency of this tariff, ISO 4217 Code
  elements: TariffElement[]; // 	+	List of tariff elements
  createDate: Date;
  updateDate: Date;
  tariffType: TariffType;
  powerType: PowerType;
  connectors: Connector[];
  countries: CountryIso3166Alpha3[];
  network: Network;
  validFrom: Date;
  description: TariffDescription;
}

export interface Location {
  id: string;
  country: CountryIso3166Alpha3;
  street: string;
  postalCode: string;
  city: string;
  lat: number;
  lng: number;
  createDate: Date;
  updateDate: Date;
  connectors: Array<Pick<
    Connector,
    "id" | "evseId" | "sanitizedEvseId" | "power" | "standard" | "powerType"
  >>;
}

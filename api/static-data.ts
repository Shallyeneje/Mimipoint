// data plans
export type DataPlan = {
  data: string;
  duration: string;
  price: number;
};

export type NetworkDataPlans = {
  [key: string]: {
    [planName: string]: DataPlan;
  };
};

export const dataPlans: Record<string, NetworkDataPlans> = {
  mtn: {
    SME: {
      "500": { data: "500MB", duration: "30 Days", price: 459 },
      M1024: { data: "1GB", duration: "30 Days", price: 699 },
      M2024: { data: "2GB", duration: "30 Days", price: 1399 },
      "3000": { data: "3GB", duration: "30 Days", price: 2089 },
      "5000": { data: "5GB", duration: "30 Days", price: 3499 },
      "10000": { data: "10GB", duration: "30 Days", price: 6999 },
    },
    direct: {
      "mtn-20hrs-1500": { data: "6GB", duration: "7 Days", price: 1599 },
      "mtn-30gb-8000": { data: "30GB", duration: "30 Days", price: 7899 },
      "mtn-40gb-10000": { data: "40GB", duration: "30 Days", price: 9859 },
      "mtn-75gb-15000": { data: "75GB", duration: "30 Days", price: 14899 },
    },
  },
  glo: {
    nightAndSpecial: {
      glo100x: { data: "1GB", duration: "5 Nights", price: 98 },
      glo200x: { data: "1.25GB", duration: "1 Day (Sunday)", price: 198 },
    },
    monthly: {
      G500: { data: "1.35GB", duration: "14 Days", price: 485 },
      G1000: { data: "2.9GB", duration: "30 Days", price: 969 },
      G2000: { data: "5.8GB", duration: "30 Days", price: 1939 },
      G2500: { data: "7.7GB", duration: "30 Days", price: 2439 },
      G3000: { data: "10GB", duration: "30 Days", price: 2939 },
      G4000: { data: "13.25GB", duration: "30 Days", price: 3879 },
      G5000: { data: "18.25GB", duration: "30 Days", price: 4839 },
      G8000: { data: "29.5GB", duration: "30 Days", price: 7779 },
      glo10000: { data: "50GB", duration: "30 Days", price: 9859 },
    },
  },
  airtel: {
    gift: {
      AIRTEL500MB: { data: "500MB", duration: "30 Days", price: 359 },
      AIRTEL1GB: { data: "1GB", duration: "30 Days", price: 659 },
      AIRTEL2GB: { data: "2GB", duration: "30 Days", price: 1319 },
      AIRTEL5GB: { data: "5GB", duration: "30 Days", price: 3299 },
      AIRTEL10GB: { data: "10GB", duration: "30 Days", price: 6599 },
      AIRTEL15GB: { data: "15GB", duration: "30 Days", price: 10789 },
      AIRTEL20GB: { data: "20GB", duration: "30 Days", price: 14389 },
    },
    monthly: {
      "airt-1100": { data: "1.5GB", duration: "30 Days", price: 1069 },
      "airt-1300": { data: "2GB", duration: "30 Days", price: 1279 },
      "airt-1650": { data: "3GB", duration: "30 Days", price: 1629 },
      "airt-2200": { data: "4.5GB", duration: "30 Days", price: 2179 },
      "airt-3300": { data: "10GB", duration: "30 Days", price: 3279 },
      "airt-5500": { data: "20GB", duration: "30 Days", price: 5479 },
      "airt-11000": { data: "40GB", duration: "30 Days", price: 10699 },
    },
    special: {
      "airt-330x": { data: "1GB", duration: "1 Day", price: 325 },
      "airt-550": { data: "750MB", duration: "14 Days", price: 539 },
      "airt-1650-2": { data: "6GB", duration: "7 Days", price: 1629 },
    },
  },
  "9mobile": {
    monthly: {
      "9MOB1000": { data: "1GB", duration: "30 Days", price: 979 },
      "9MOB34500": { data: "2.5GB", duration: "30 Days", price: 1979 },
      "9MOB8000": { data: "11.5GB", duration: "30 Days", price: 7899 },
      "9MOB5000": { data: "15GB", duration: "30 Days", price: 9859 },
    },
  },
};

// Define the structure for Cable TV Packages
type CableTvProviders = "dstv" | "gotv" | "startimes";

type CableTvPackages = Record<CableTvProviders, Record<string, string>>;

export const cableTvPackages: CableTvPackages = {
  dstv: {
    "dstv-padi": "DStv Padi",
    "dstv-yanga": "DStv Yanga",
    "dstv-confam": "DStv Confam",
    dstv6: "DStv Asia",
    dstv79: "DStv Compact",
    dstv7: "DStv Compact Plus",
    dstv3: "DStv Premium",
    dstv10: "DStv Premium Asia",
    dstv9: "DStv Premium-French",
    "confam-extra": "DStv Confam + ExtraView",
    "yanga-extra": "DStv Yanga + ExtraView",
    "padi-extra": "DStv Padi + ExtraView",
    "com-asia": "DStv Compact + Asia",
    dstv30: "DStv Compact + Extra View",
    "com-frenchtouch": "DStv Compact + French Touch",
    dstv33: "DStv Premium – Extra View",
    dstv40: "DStv Compact Plus – Asia",
    "com-frenchtouch-extra": "DStv Compact + French Touch + ExtraView",
    "com-asia-extra": "DStv Compact + Asia + ExtraView",
    dstv43: "DStv Compact Plus + French Plus",
    "complus-frenchtouch": "DStv Compact Plus + French Touch",
    dstv45: "DStv Compact Plus – Extra View",
    "complus-french-extraview": "DStv Compact Plus + FrenchPlus + Extra View",
    dstv47: "DStv Compact + French Plus",
    dstv48: "DStv Compact Plus + Asia + ExtraView",
    dstv61: "DStv Premium + Asia + Extra View",
    dstv62: "DStv Premium + French + Extra View",
    "hdpvr-access-service": "DStv HDPVR Access Service",
    "frenchplus-addon": "DStv French Plus Add-on",
    "asia-addon": "DStv Asian Add-on",
    "frenchtouch-addon": "DStv French Touch Add-on",
    "extraview-access": "ExtraView Access",
    french11: "DStv French 11",
  },
  gotv: {
    "gotv-smallie": "GOtv Smallie",
    "gotv-jinja": "GOtv Jinja",
    "gotv-jolli": "GOtv Jolli",
    "gotv-max": "GOtv Max",
    "gotv-supa": "GOtv Supa",
  },
  startimes: {
    nova: "Startimes Nova",
    basic: "Startimes Basic",
    smart: "Startimes Smart",
    classic: "Startimes Classic",
    super: "Startimes Super",
  },
};

// Define the structure for Electricity Providers
export type ElectricityProvider = {
  id: string;
  name: string;
  img: string;
};

export const electricityProviders: ElectricityProvider[] = [
  {
    id: "abuja-electric",
    name: "Abuja Electricity Distribution Company (AEDC)",
    img: "/images/abuja-electric.jpg",
  },
  {
    id: "eko-electric",
    name: "Eko Electricity Distribution Company (EKEDC)",
    img: "/images/EKEDC.webp",
  },
  {
    id: "ibadan-electric",
    name: "Ibadan Electricity Distribution Company (IBEDC)",
    img: "/images/Iibadan-electric.jpg",
  },
  {
    id: "ikeja-electric",
    name: "Ikeja Electricity Distribution Company (IKEDC)",
    img: "/images/ikeja-electric.jpg",
  },
  {
    id: "jos-electric",
    name: "Jos Electricity Distribution PLC (JEDplc)",
    img: "/images/jos-electric.jpeg",
  },
  {
    id: "kaduna-electric",
    name: "Kaduna Electricity Distribution Company (KAEDCO)",
    img: "/images/kaduna-electric.jpeg",
  },
  {
    id: "kano-electric",
    name: "Kano Electricity Distribution Company (KEDCO)",
    img: "/images/kano-electric.jpg",
  },
  {
    id: "portharcourt-electric",
    name: "Port Harcourt Electricity Distribution Company (PHED)",
    img: "/images/portharcourt-electric.png",
  },
  {
    id: "enugu-electric",
    name: "Enugu Electricity Distribution Company (EEDC)",
    img: "/images/enugu-electric.jpg",
  },
  {
    id:"benin-electric",
    name: "Benin Electricity Description Plc",
    img: "/images/benin-electric.png"
  }
];

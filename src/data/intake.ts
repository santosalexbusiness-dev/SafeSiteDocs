/** Field definitions for the custom safety binder intake form. */

export const hazardQuestions: { id: string; label: string }[] = [
  { id: "heights", label: "Do employees work at heights?" },
  { id: "ladders", label: "Do employees use ladders?" },
  { id: "scaffolds", label: "Do employees use scaffolds?" },
  { id: "powerTools", label: "Do employees use power tools?" },
  { id: "electrical", label: "Do employees perform electrical work?" },
  { id: "hotWork", label: "Do employees perform hot work?" },
  { id: "chemicals", label: "Do employees use chemicals?" },
  { id: "vehicles", label: "Do employees operate vehicles?" },
  { id: "heavyEquipment", label: "Do employees use heavy equipment?" },
  { id: "confinedSpace", label: "Do employees enter confined spaces?" },
  { id: "excavation", label: "Do employees perform excavation / trenching?" },
  { id: "respiratory", label: "Do employees need respiratory protection?" },
  { id: "forklifts", label: "Do employees use forklifts or powered industrial trucks?" },
  { id: "heat", label: "Do employees work outdoors in heat?" },
  { id: "asbestosLead", label: "Do employees handle asbestos or lead-related work?" },
];

export const employeeRanges = [
  { value: "1-5", label: "1–5 employees" },
  { value: "6-10", label: "6–10 employees" },
  { value: "11-25", label: "11–25 employees" },
  { value: "26-50", label: "26–50 employees" },
  { value: "51-100", label: "51–100 employees" },
  { value: "100+", label: "100+ employees" },
];

export const packageOptions = [
  { value: "custom-binder", label: "Custom Safety Binder — $799" },
  { value: "contractor-pro", label: "Contractor Safety Pro Package — $1,499" },
  { value: "premium-system", label: "Premium Safety System — $2,499" },
  { value: "unsure", label: "Not sure yet — help me choose" },
];

export const currentDocsOptions = [
  { value: "none", label: "None yet" },
  { value: "some", label: "Some forms / templates" },
  { value: "outdated", label: "Have a binder, but it's outdated" },
  { value: "full", label: "Full program — just need updates" },
];

/** Contractor prequalification platforms (high-intent buying trigger). */
export const prequalOptions = [
  { id: "isnetworld", label: "ISNetworld" },
  { id: "avetta", label: "Avetta" },
  { id: "veriforce", label: "Veriforce" },
  { id: "pec", label: "PEC Premier" },
  { id: "pics", label: "PICS" },
  { id: "browz", label: "BROWZ" },
  { id: "other", label: "Other platform" },
  { id: "none", label: "Not sure / none" },
];

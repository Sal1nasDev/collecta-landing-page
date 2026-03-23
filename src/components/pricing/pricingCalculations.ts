export interface PricingInputs {
  invoices: number;
  recovery: number;
  totalDocuments: number;
  peakThreshold: number;
  agingCurrent: number;
  aging1to30: number;
  aging31to60: number;
  aging61to90: number;
  aging90plus: number;
  debtors: number;
  dso: number;
}

export function calculatePCI(inputs: PricingInputs) {
  const { invoices, recovery, debtors, totalDocuments, peakThreshold, aging31to60, aging61to90, aging90plus } = inputs;

  // Aging over 40%: sum of 31+ day buckets > 40% of total documents
  const aged31Plus = aging31to60 + aging61to90 + aging90plus;
  const agingOver40 = totalDocuments > 0 ? (aged31Plus / totalDocuments) > 0.4 : false;

  // Peak over 150%: peak threshold > 1.5x average invoices
  const peakOver150 = invoices > 0 ? peakThreshold > (invoices * 1.5) : false;

  const volumeScore = 2.0 * (invoices / 1000);
  const valueScore = 0.75 * (recovery / 100000);
  const debtorScore = 0.045 * debtors;
  const agingScore = agingOver40 ? 1.0 : 0;
  const peakScore = peakOver150 ? 1.0 : 0;

  return {
    total: volumeScore + valueScore + debtorScore + agingScore + peakScore,
    components: { volumeScore, valueScore, debtorScore, agingScore, peakScore },
  };
}

export function calculatePricing(pci: number) {
  return {
    essential: Math.round((200 + pci * 55) / 10) * 10,
    professional: Math.round((600 + pci * 165) / 10) * 10,
    enterprise: Math.round((1200 + pci * 330) / 10) * 10,
  };
}

export function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US");
}

export interface ROIResults {
  currentHours: number;
  armsHours: number;
  savedHours: number;
  currentEfficiency: number;
  armsEfficiency: number;
  efficiencyGain: number;
  currentDSO: number;
  armsDSO: number;
  dsoReduction: number;
  annualValueRecovered: number;
}

export function calculateROI(inputs: {
  invoices: number;
  recovery: number;
  dso: number;
  hourlyRate: number;
  currentCollectionRate: number;
  targetCollectionRate: number;
}): ROIResults {
  const { invoices, recovery, dso, hourlyRate, currentCollectionRate, targetCollectionRate } = inputs;

  // Hours estimate: ~2 min per invoice manually, ~0.5 min with ARMS
  const currentHours = Math.round((invoices * 2) / 60);
  const armsHours = Math.round((invoices * 0.5) / 60);
  const savedHours = currentHours - armsHours;

  const currentEfficiency = currentCollectionRate;
  const armsEfficiency = targetCollectionRate;
  const efficiencyGain = targetCollectionRate - currentCollectionRate;

  const dsoReduction = Math.round(dso * 0.33); // ~33% DSO reduction
  const armsDSO = dso - dsoReduction;

  // Annual value: monthly recovery * efficiency gain * 12
  const annualValueRecovered = Math.round(recovery * (efficiencyGain / 100) * 12);

  return {
    currentHours,
    armsHours,
    savedHours,
    currentEfficiency,
    armsEfficiency,
    efficiencyGain,
    currentDSO: dso,
    armsDSO,
    dsoReduction,
    annualValueRecovered,
  };
}

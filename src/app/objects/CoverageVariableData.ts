import {
  Utility
} from '../utils/utility';

export class CoverageVariableData {
  //1100
  lossAndDamageType: number;
  //TIP_LOSS_DAMAGE
  finalRate: number;
  //PCT_FINAL_RATE
  adjustedCommissionRate: number;
  //PCT_ADJ_COMM_RATE
  lossRatioRate: number;
  //PCT_ADJ_COMM_RATE

  //1002
  ownDamageTowingLimit: number;
  //NUM_OD_TOWING_LIMIT
  ownDamageRepairLimit: number;
  //NUM_OD_REPAIR_LIMIT
  ownDamageSpecialDeductible: number;
  //VAL_OD_SPECIAL_DEDUCTIBLE

  //1003
  theftTowingLimit: number;
  //NUM_TH_TOWING_LIMIT
  theftRepairLimit: number;
  //NUM_TH_REPAIR_LIMIT
  theftSpecialDeductible: number;
  //VAL_TH_SPECIAL_DEDUCTIBLE

  //1007
  uppaDiscountType: number;
  //TIP_UPPA_DISCOUNT
  uppaDiscountAmount: number;
  //IMP_UPPA_DISCOUNT
  uppaCommissionAdjustment: number;
  //PCT_UPPA_COMMN_ADJ
  sumInsuredPerPassenger: number;
  //VAL_ASEG_POR_PASAJERO

  //1008
  aonFinalRate: number;
  //PCT_AON_FINAL_RATE
  aonTowingLimit: number;
  //NUM_AON_TOWING_LIMIT
  aonRepairLimit: number;
  //NUM_AON_REPAIR_LIMIT
  aonSpecialDeductible: number;
  //VAL_AON_SPECIAL_DEDUCTIBLE
  aonCommissionAdjustment: number;
  //PCT_AON_COMMN_ADJ

  //1020
  srccFinalRate: number;
  //PCT_SRCC_FINAL_RATE
  srccTowingLimit: number;
  //NUM_SRCC_TOWING_LIMIT
  srccRepairLimit: number;
  //NUM_SRCC_REPAIR_LIMIT
  srccSpecialDeductible: number;
  //VAL_SRCC_SPECIAL_DEDUCTIBLE
  srccCommissionAdjustment: number;
  //PCT_SRCC_COMMN_ADJ

  //1040
  roadAssistDiscount: number;
  //VAL_RA_DISC

  //1029
  ra100Discount: number;
  //VAL_RA100_DISC

  getDefaultValues(arr: any[], cvd ? : CoverageVariableData) {
    const variableData = new CoverageVariableData();
    const hasCVD = !Utility.isUndefined(cvd);

    arr.forEach((a) => {
      const value = !Utility.isUndefined(a.valCampo) ? parseFloat(a.valCampo) : null;

      switch (a.codCampo) {
        case "TIP_LOSS_DAMAGE": {
          variableData.lossAndDamageType = value;
          if (hasCVD) {
            cvd.lossAndDamageType = value;
          }
          break;
        }
        case "PCT_FINAL_RATE": {
          variableData.finalRate = value;
          if (hasCVD) {
            cvd.finalRate = value;
          }
          break;
        }
        case "PCT_ADJ_COMM_RATE": {
          variableData.adjustedCommissionRate = value;
          if (hasCVD) {
            cvd.adjustedCommissionRate = value;
          }
          break;
        }
        case "PCT_LOSS_RATIO": {
          variableData.lossRatioRate = value;
          if (hasCVD) {
            cvd.lossRatioRate = value;
          }
          break;
        }

        case "NUM_OD_TOWING_LIMIT": {
          variableData.ownDamageTowingLimit = value;
          if (hasCVD) {
            cvd.ownDamageTowingLimit = value;
          }
          break;
        }
        case "NUM_OD_REPAIR_LIMIT": {
          variableData.ownDamageRepairLimit = value;
          if (hasCVD) {
            cvd.ownDamageRepairLimit = value;
          }
          break;
        }
        case "VAL_OD_SPECIAL_DEDUCTIBLE": {
          variableData.ownDamageSpecialDeductible = value;
          if (hasCVD) {
            cvd.ownDamageSpecialDeductible = value;
          }
          break;
        }

        case "NUM_TH_TOWING_LIMIT": {
          variableData.theftTowingLimit = value;
          if (hasCVD) {
            cvd.theftTowingLimit = value;
          }
          break;
        }
        case "NUM_TH_REPAIR_LIMIT": {
          variableData.theftRepairLimit = value;
          if (hasCVD) {
            cvd.theftRepairLimit = value;
          }
          break;
        }
        case "VAL_TH_SPECIAL_DEDUCTIBLE": {
          variableData.theftSpecialDeductible = value;
          if (hasCVD) {
            cvd.theftSpecialDeductible = value;
          }
          break;
        }

        case "TIP_UPPA_DISCOUNT": {
          variableData.uppaDiscountType = value;
          if (hasCVD) {
            cvd.uppaDiscountType = value;
          }
          break;
        }
        case "IMP_UPPA_DISCOUNT": {
          variableData.uppaDiscountAmount = value;
          if (hasCVD) {
            cvd.uppaDiscountAmount = value;
          }
          break;
        }
        case "PCT_UPPA_COMMN_ADJ": {
          variableData.uppaCommissionAdjustment = value;
          if (hasCVD) {
            cvd.uppaCommissionAdjustment = value;
          }
          break;
        }
        case "VAL_ASEG_POR_PASAJERO": {
          variableData.sumInsuredPerPassenger = value;
          if (hasCVD) {
            cvd.sumInsuredPerPassenger = value;
          }
          break;
        }

        case "PCT_AON_FINAL_RATE": {
          variableData.aonFinalRate = value;
          if (hasCVD) {
            cvd.aonFinalRate = value;
          }
          break;
        }
        case "NUM_AON_TOWING_LIMIT": {
          variableData.aonTowingLimit = value;
          if (hasCVD) {
            cvd.aonTowingLimit = value;
          }
          break;
        }
        case "NUM_AON_REPAIR_LIMIT": {
          variableData.aonRepairLimit = value;
          if (hasCVD) {
            cvd.aonRepairLimit = value;
          }
          break;
        }
        case "VAL_AON_SPECIAL_DEDUCTIBLE": {
          variableData.aonSpecialDeductible = value;
          if (hasCVD) {
            cvd.aonSpecialDeductible = value;
          }
          break;
        }
        case "PCT_AON_COMMN_ADJ": {
          variableData.aonCommissionAdjustment = value;
          if (hasCVD) {
            cvd.aonCommissionAdjustment = value;
          }
          break;
        }

        case "PCT_SRCC_FINAL_RATE": {
          variableData.srccFinalRate = value;
          if (hasCVD) {
            cvd.srccFinalRate = value;
          }
          break;
        }
        case "NUM_SRCC_TOWING_LIMIT": {
          variableData.srccTowingLimit = value;
          if (hasCVD) {
            cvd.srccTowingLimit = value;
          }
          break;
        }
        case "NUM_SRCC_REPAIR_LIMIT": {
          variableData.srccRepairLimit = value;
          if (hasCVD) {
            cvd.srccRepairLimit = value;
          }
          break;
        }
        case "VAL_SRCC_SPECIAL_DEDUCTIBLE": {
          variableData.srccSpecialDeductible = value;
          if (hasCVD) {
            cvd.srccSpecialDeductible = value;
          }
          break;
        }
        case "PCT_SRCC_COMMN_ADJ": {
          variableData.srccCommissionAdjustment = value;
          if (hasCVD) {
            cvd.srccCommissionAdjustment = value;
          }
          break;
        }

        case "VAL_RA_DISC": {
          variableData.roadAssistDiscount = value;
          if (hasCVD) {
            cvd.roadAssistDiscount = value;
          }
          break;
        }

        case "VAL_RA100_DISC": {
          variableData.ra100Discount = value;
          if (hasCVD) {
            cvd.ra100Discount = value;
          }
          break;
        }

        default: {
          //statements; 
          break;
        }
      }
    });

    return variableData;
  }

  validateValues(cvddv: CoverageVariableData, cvd: CoverageVariableData) {
    if (Utility.isUndefined(cvd.lossAndDamageType)) {
      cvd.lossAndDamageType = cvddv.lossAndDamageType;
    }

    if (cvd.finalRate > 100) {
      cvd.finalRate = 100;
    } else if (Utility.isUndefined(cvd.finalRate)) {
      cvd.finalRate = cvddv.finalRate;
    }

    if (cvd.adjustedCommissionRate > 100) {
      cvd.adjustedCommissionRate = 100;
    } else if (Utility.isUndefined(cvd.adjustedCommissionRate)) {
      cvd.adjustedCommissionRate = cvddv.adjustedCommissionRate;
    }

    if (cvd.lossRatioRate > 100) {
      cvd.lossRatioRate = 100;
    } else if (Utility.isUndefined(cvd.lossRatioRate)) {
      cvd.lossRatioRate = cvddv.lossRatioRate;
    }

    if (Utility.isUndefined(cvd.ownDamageTowingLimit)) {
      cvd.ownDamageTowingLimit = cvddv.ownDamageTowingLimit;
    }

    if (Utility.isUndefined(cvd.ownDamageRepairLimit)) {
      cvd.ownDamageRepairLimit = cvddv.ownDamageRepairLimit;
    }

    if (Utility.isUndefined(cvd.ownDamageSpecialDeductible)) {
      cvd.ownDamageSpecialDeductible = cvddv.ownDamageSpecialDeductible;
    }

    if (Utility.isUndefined(cvd.theftTowingLimit)) {
      cvd.theftTowingLimit = cvddv.theftTowingLimit;
    }

    if (Utility.isUndefined(cvd.theftRepairLimit)) {
      cvd.theftRepairLimit = cvddv.theftRepairLimit;
    }

    if (Utility.isUndefined(cvd.theftSpecialDeductible)) {
      cvd.theftSpecialDeductible = cvddv.theftSpecialDeductible;
    }

    if (Utility.isUndefined(cvd.uppaDiscountType)) {
      cvd.uppaDiscountType = cvddv.uppaDiscountType;
    }

    if (Utility.isUndefined(cvd.uppaDiscountAmount)) {
      cvd.uppaDiscountAmount = cvddv.uppaDiscountAmount;
    }

    if (cvd.uppaCommissionAdjustment > 100) {
      cvd.uppaCommissionAdjustment = 100;
    } else if (Utility.isUndefined(cvd.uppaCommissionAdjustment)) {
      cvd.uppaCommissionAdjustment = cvddv.uppaCommissionAdjustment;
    }

    if (Utility.isUndefined(cvd.sumInsuredPerPassenger)) {
      cvd.sumInsuredPerPassenger = cvddv.sumInsuredPerPassenger;
    }

    if (cvd.aonFinalRate > 100) {
      cvd.aonFinalRate = 100;
    } else if (Utility.isUndefined(cvd.aonFinalRate)) {
      cvd.aonFinalRate = cvddv.aonFinalRate;
    }

    if (Utility.isUndefined(cvd.aonTowingLimit)) {
      cvd.aonTowingLimit = cvddv.aonTowingLimit;
    }

    if (Utility.isUndefined(cvd.aonRepairLimit)) {
      cvd.aonRepairLimit = cvddv.aonRepairLimit;
    }

    if (Utility.isUndefined(cvd.aonSpecialDeductible)) {
      cvd.aonSpecialDeductible = cvddv.aonSpecialDeductible;
    }

    if (cvd.aonCommissionAdjustment > 100) {
      cvd.aonCommissionAdjustment = 100;
    } else if (Utility.isUndefined(cvd.aonCommissionAdjustment)) {
      cvd.aonCommissionAdjustment = cvddv.aonCommissionAdjustment;
    }

    if (cvd.srccFinalRate > 100) {
      cvd.srccFinalRate = 100;
    } else if (Utility.isUndefined(cvd.srccFinalRate)) {
      cvd.srccFinalRate = cvddv.srccFinalRate;
    }

    if (Utility.isUndefined(cvd.srccTowingLimit)) {
      cvd.srccTowingLimit = cvddv.srccTowingLimit;
    }

    if (Utility.isUndefined(cvd.srccRepairLimit)) {
      cvd.srccRepairLimit = cvddv.srccRepairLimit;
    }

    if (Utility.isUndefined(cvd.srccSpecialDeductible)) {
      cvd.srccSpecialDeductible = cvddv.srccSpecialDeductible;
    }

    if (cvd.srccCommissionAdjustment > 100) {
      cvd.srccCommissionAdjustment = 100;
    } else if (Utility.isUndefined(cvd.srccCommissionAdjustment)) {
      cvd.srccCommissionAdjustment = cvddv.srccCommissionAdjustment;
    }

    if (Utility.isUndefined(cvd.roadAssistDiscount)) {
      cvd.roadAssistDiscount = cvddv.roadAssistDiscount;
    }

    if (Utility.isUndefined(cvd.ra100Discount)) {
      cvd.ra100Discount = cvddv.ra100Discount;
    }
  }

  constructor(init ? : Partial < CoverageVariableData > ) {
    Object.assign(this, init);
  }
}

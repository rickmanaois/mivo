import {
  Component,
  OnInit,
  Input,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import {
  QuoteCar
} from 'src/app/objects/QuoteCar';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';

const coverageList: any[] = [{
  "MCA_TIP_CAPITAL": "4",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1001",
  "IMP_CALCULO": "0",
  "NOM_COB": "COMP. THIRD PAR. LIAB."
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1100",
  "IMP_CALCULO": "0",
  "NOM_COB": "LOSS AND DAMAGE"
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1002",
  "IMP_CALCULO": "0",
  "NOM_COB": "OWN DAMAGE"
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1003",
  "IMP_CALCULO": "0",
  "NOM_COB": "THEFT"
}, {
  "MCA_TIP_CAPITAL": "4",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1004",
  "IMP_CALCULO": "0",
  "NOM_COB": "VTPL-BODILY INJURY"
}, {
  "MCA_TIP_CAPITAL": "4",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1005",
  "IMP_CALCULO": "0",
  "NOM_COB": "VTPL-PROPERTY DAMAGE"
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1007",
  "IMP_CALCULO": "0",
  "NOM_COB": "UNNAMED PASS. P.A."
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1008",
  "IMP_CALCULO": "0",
  "NOM_COB": "ACTS OF NATURE"
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1020",
  "IMP_CALCULO": "0",
  "NOM_COB": "STRIKE AND RIOTS"
}, {
  "MCA_TIP_CAPITAL": "4",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1026",
  "IMP_CALCULO": "0",
  "NOM_COB": "ACCD'L DEATH/DISABL."
}, {
  "MCA_TIP_CAPITAL": "",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1040",
  "IMP_CALCULO": "0",
  "NOM_COB": "ROAD ASSIST"
}, {
  "MCA_TIP_CAPITAL": "5",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1029",
  "IMP_CALCULO": "360",
  "NOM_COB": "ROAD ASSIST 100"
}, {
  "MCA_TIP_CAPITAL": "",
  "MCA_OBLIGATORIO": "N",
  "COD_COB": "1027",
  "IMP_CALCULO": "500",
  "NOM_COB": "MAPFRE ROAD ASSIST"
}, {
  "MCA_TIP_CAPITAL": "4",
  "MCA_OBLIGATORIO": "S",
  "COD_COB": "1036",
  "IMP_CALCULO": "1",
  "NOM_COB": "PERSONAL PROPERTY COVER"
}];

const amountList: any[] = [{
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1001,
  "codLimite": 1,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "RGCASTRO",
  "fecActu": "2016-06-01 18:23:53.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 1,
  "nomLimite": "50000",
  "impLimite": 50000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 2,
  "nomLimite": "75000",
  "impLimite": 75000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 3,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 4,
  "nomLimite": "150000",
  "impLimite": 150000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 5,
  "nomLimite": "200000",
  "impLimite": 200000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 6,
  "nomLimite": "250000",
  "impLimite": 250000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 7,
  "nomLimite": "300000",
  "impLimite": 300000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 8,
  "nomLimite": "400000",
  "impLimite": 400000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 9,
  "nomLimite": "500000",
  "impLimite": 500000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 10,
  "nomLimite": "750000",
  "impLimite": 750000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 11,
  "nomLimite": "1000000",
  "impLimite": 1000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 12,
  "nomLimite": "2000000",
  "impLimite": 2000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2018-03-13 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1004,
  "codLimite": 13,
  "nomLimite": "1500000",
  "impLimite": 1500000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2019-08-02 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 1,
  "nomLimite": "50000",
  "impLimite": 50000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 2,
  "nomLimite": "75000",
  "impLimite": 75000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 3,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 4,
  "nomLimite": "150000",
  "impLimite": 150000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 5,
  "nomLimite": "200000",
  "impLimite": 200000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 6,
  "nomLimite": "250000",
  "impLimite": 250000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 7,
  "nomLimite": "300000",
  "impLimite": 300000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 8,
  "nomLimite": "400000",
  "impLimite": 400000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 9,
  "nomLimite": "500000",
  "impLimite": 500000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 10,
  "nomLimite": "750000",
  "impLimite": 750000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 11,
  "nomLimite": "1000000",
  "impLimite": 1000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 12,
  "nomLimite": "2000000",
  "impLimite": 2000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2018-03-13 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1005,
  "codLimite": 13,
  "nomLimite": "3000000",
  "impLimite": 3000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2019-08-02 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 1,
  "nomLimite": "50000",
  "impLimite": 50000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 2,
  "nomLimite": "75000",
  "impLimite": 75000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 3,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 4,
  "nomLimite": "150000",
  "impLimite": 150000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 5,
  "nomLimite": "200000",
  "impLimite": 200000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 6,
  "nomLimite": "250000",
  "impLimite": 250000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 7,
  "nomLimite": "300000",
  "impLimite": 300000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 8,
  "nomLimite": "400000",
  "impLimite": 400000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 9,
  "nomLimite": "500000",
  "impLimite": 500000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 10,
  "nomLimite": "750000",
  "impLimite": 750000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1006,
  "codLimite": 11,
  "nomLimite": "1000000",
  "impLimite": 1000000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1026,
  "codLimite": 1,
  "nomLimite": "50000",
  "impLimite": 50000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2017-04-25 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1026,
  "codLimite": 2,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "RGCASTRO",
  "fecActu": "2015-10-19 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1026,
  "codLimite": 3,
  "nomLimite": "250000",
  "impLimite": 250000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "CMJUBILO",
  "fecActu": "2017-03-31 11:38:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1029,
  "codLimite": 1,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1036,
  "codLimite": 1,
  "nomLimite": "2000",
  "impLimite": 2000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1036,
  "codLimite": 2,
  "nomLimite": "3000",
  "impLimite": 3000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2018-05-22 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1036,
  "codLimite": 3,
  "nomLimite": "5000",
  "impLimite": 5000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2019-01-17 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1038,
  "codLimite": 1,
  "nomLimite": "250000",
  "impLimite": 250000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 1,
  "nomLimite": "50000",
  "impLimite": 50000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2016-07-08 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 2,
  "nomLimite": "100000",
  "impLimite": 100000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 3,
  "nomLimite": "200000",
  "impLimite": 200000,
  "impLimiteSup": null,
  "mcaLimiteDef": "S",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "JEFFOJA",
  "fecActu": "2016-07-08 00:00:00.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 4,
  "nomLimite": "300000",
  "impLimite": 300000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 5,
  "nomLimite": "400000",
  "impLimite": 400000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}, {
  "codCia": 1,
  "codRamo": 100,
  "codModalidad": 99999,
  "codCob": 1102,
  "codLimite": 6,
  "nomLimite": "500000",
  "impLimite": 500000,
  "impLimiteSup": null,
  "mcaLimiteDef": "N",
  "mcaInh": "N",
  "fecValidez": "2014-05-01 00:00:00.0",
  "codUsr": "TRON2000",
  "fecActu": "2015-06-25 22:44:34.0"
}];

const configList: any[] = [{
  "codCia": 1,
  "codRamo": "100",
  "codModalidad": "99999",
  "codCob": "1020",
  "mcaTipCapitalF": "F"
}, {
  "codCia": 1,
  "codRamo": "100",
  "codModalidad": "99999",
  "codCob": "1008",
  "mcaTipCapitalF": "F"
}]

const premiumAmount: any[] = [{
  "codCob": 9998,
  "numRiesgo": 0,
  "impSpto": 5602.5
}, {
  "codCob": 1007,
  "numRiesgo": 1,
  "impSpto": 900
}, {
  "codCob": 1005,
  "numRiesgo": 1,
  "impSpto": 1245
}, {
  "codCob": 1036,
  "numRiesgo": 1,
  "impSpto": 0
}, {
  "codCob": 1004,
  "numRiesgo": 1,
  "impSpto": 420
}, {
  "codCob": 1002,
  "numRiesgo": 1,
  "impSpto": 9477
}, {
  "codCob": 1003,
  "numRiesgo": 1,
  "impSpto": 6318
}, {
  "codCob": 1008,
  "numRiesgo": 1,
  "impSpto": 4050
}, {
  "codCob": 1040,
  "numRiesgo": 1,
  "impSpto": 0
}];

const coverageAmount: any[] = [{
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1002,
  "codRamo": 100,
  "numSecu": 3,
  "sumaAseg": 810000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 810000,
  "tasaCob": 13,
  "codFranquicia": 2,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": 2000,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1003,
  "codRamo": 100,
  "numSecu": 4,
  "sumaAseg": 810000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 810000,
  "tasaCob": 9,
  "codFranquicia": 2,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": 2000,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1004,
  "codRamo": 100,
  "numSecu": 5,
  "sumaAseg": 200000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 200000,
  "tasaCob": 2,
  "codFranquicia": null,
  "codLimite": 5,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1005,
  "codRamo": 100,
  "numSecu": 6,
  "sumaAseg": 200000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 200000,
  "tasaCob": 6,
  "codFranquicia": null,
  "codLimite": 5,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1007,
  "codRamo": 100,
  "numSecu": 7,
  "sumaAseg": 450000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 450000,
  "tasaCob": 2,
  "codFranquicia": null,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1008,
  "codRamo": 100,
  "numSecu": 9,
  "sumaAseg": 810000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 810000,
  "tasaCob": 5,
  "codFranquicia": 2,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 101,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": 2000,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1036,
  "codRamo": 100,
  "numSecu": 20,
  "sumaAseg": 2000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 2000,
  "tasaCob": 0,
  "codFranquicia": null,
  "codLimite": 1,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 0,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1040,
  "codRamo": 100,
  "numSecu": 16,
  "sumaAseg": 0,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 0,
  "tasaCob": 250000,
  "codFranquicia": null,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 0,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": 0,
  "impAgrRelSpto": 0,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}, {
  "codCia": 1,
  "numPoliza": "9990000308905",
  "numSpto": 0,
  "numApli": 0,
  "numSptoApli": 0,
  "numRiesgo": 1,
  "numPeriodo": 1,
  "codCob": 1100,
  "codRamo": 100,
  "numSecu": 2,
  "sumaAseg": 810000,
  "impUnidad": null,
  "pctParticipacion": null,
  "codMonCapital": 1,
  "sumaAsegBajaStro": null,
  "sumaAsegSpto": 810000,
  "tasaCob": 0,
  "codFranquicia": null,
  "codLimite": null,
  "sumaAsegSup": null,
  "mcaBajaRiesgo": "N",
  "mcaVigente": "S",
  "mcaVigenteApli": "S",
  "mcaBajaCob": "N",
  "codSeccReas": 0,
  "impAgr": 0,
  "impAgrRel": null,
  "impAgrSpto": null,
  "impAgrRelSpto": null,
  "mesBaseRegulariza": null,
  "anioBaseRegulariza": null,
  "pctEnfermedad": null,
  "duracionProfesion": null,
  "pctProfesion": null,
  "duracionEnfermedad": null,
  "valFranquiciaMin": null,
  "valFranquiciaMax": null,
  "sumaAsegBajaStroAcc": null
}];

export interface TablesDTO {
  isMandatory: boolean;
  included: boolean;
  coverage: string;
  options: [];
  sumInsured: number;
  netPremium: number;
  isRoadAssist: boolean;
  isSelect: boolean;
}

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.css']
})
export class CoveragesComponent implements OnInit {
  @Input() carDetails: QuoteCar;
  @Input() coverageList: any[];
  @Input() amountList: any[];
  // @Input() coverageVariable: any[];
  @Input() premiumAmount: any[];
  @Input() coverageAmount: any[];

  cForm: FormGroup;
  displayedColumns: string[] = ['included', 'coverage', 'sumInsured', 'netPremium', 'action'];
  source: any[];
  dataSource = new MatTableDataSource < TablesDTO > (this.source);

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.coverageList = coverageList;
    this.amountList = amountList;
    this.premiumAmount = premiumAmount;
    this.coverageAmount = coverageAmount;

    this.source = this.getData();
    this.dataSource = new MatTableDataSource < TablesDTO > (this.source);
    this.setForm(this.dataSource.filteredData);
  }

  editCoverage(coverage: TablesDTO) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: coverage
    });

    dialogRef.afterClosed().subscribe(result => {
      // if update button is clicked
      if (result) {
        this.updateRow(coverage);
      }
    });
  }

  updateRow(row: TablesDTO) {
    let updateItem = this.source.find(this.findIndexToUpdate, row.coverage);
    let index = this.source.indexOf(updateItem);
    this.source[index] = row;

    // updating source
    this.dataSource = new MatTableDataSource < TablesDTO > (this.source);
    this.dataSource._updateChangeSubscription();
    this.dataSource._renderChangesSubscription;
    this.setForm(this.dataSource.filteredData);
  }

  findIndexToUpdate(row: any) {
    return row.coverage === this;
  }

  private setForm(d: any[]) {
    this.cForm = this.formBuilder.group({
      coverages: this.formBuilder.array([])
    });

    const control = this.cForm.get('coverages') as FormArray;
    d.forEach((coverage) => {
      control.push(this.setCoverageFormArray(coverage));
    });

    this.cForm.get('coverages').valueChanges.subscribe(coverages => {
      this.dataSource = coverages;
    });
  }

  private setCoverageFormArray(coverage: any) {
    return this.formBuilder.group({
      isMandatory: [coverage.isMandatory],
      included: [coverage.included],
      code: [coverage.code],
      coverage: [coverage.coverage],
      options: [coverage.options],
      sumInsured: [coverage.sumInsured],
      netPremium: [coverage.netPremium],
      isRoadAssist: [coverage.isRoadAssist],
      isSelect: [coverage.isSelect]
    });
  }

  private getData() {
    // this.coverage;
    // this.amountList = amountList;
    // this.premiumAmount = premiumAmount;
    // this.coverageAmount = coverageAmount;
    var returnData: any[] = [];

    this.coverageList.forEach((cov) => {
      var code = cov.COD_COB;
      // var vehicleValue = this.carDetails.vehicleValue;
      // var product = this.carDetails.productList;
      var vehicleValue = 775000;
      var product = 10001;
      var name = cov.NOM_COB;
      var type = cov.MCA_TIP_CAPITAL;
      var isMandatory = cov.MCA_OBLIGATORIO == "S";

      var options = [];
      var isSelect = false;
      var sumaAsegA = 0;
      var netPremium = 0;

      this.premiumAmount.forEach((prem) => {
        if (code == prem.codCob) {
          netPremium = prem.impSpto;
        }
      });

      this.coverageAmount.forEach((covAmount) => {
        if (code == covAmount.codCob) {
          sumaAsegA = covAmount.sumaAseg;
          // if (isLoadQuotation) {
          //   chked = 'checked=checked';
          //   optPremium = premium;
          //   optSumaAseg = covAmount[y].sumaAseg;
          //   if (cod_cob === '1001') {
          //     addCtplNeededManipulation();
          //   }
          // }
        }
      });

      if (code == "1040") {
        // var isRa1040Checked = $("#chk1040").is(':checked');
        // var isRa1029Checked = $("#chk1029").is(':checked');
        // var isRa1027Checked = $("#chk1027").is(':checked');
        // if (checkRa() == "S" && (!isRa1029Checked && !isRa1027Checked)) {
        //   chked = 'checked=checked';
        // }
      }

      var k = 0;
      var selectedOpt = "";
      if (type == 4) {
        isSelect = true;
        if (code == "1036" || code == "1001") {
          // isSelect = true;
          // create += '<td class="col-md-3">' +
          //   '<select disabled="disabled" style="width:100%" onChange="updateSumaAseg(' +
          //   cod_cob + ')" id="' + cod_cob + '">' +
          //   suma_asegDD + '</select>' + '</td>';
        } else {
          // selectMandatoryCov
        }

        this.amountList.forEach((amount) => {
          if (code == amount.codCob) {
            k = +k + +1;
            if (k == 1) {
              if (sumaAsegA == 0) {
                sumaAsegA = amount.impLimite;
              }
            }

            if (sumaAsegA == amount.impLimite) {
              selectedOpt = amount.impLimite;
            }

            options.push({
              value: amount.impLimite
            });
          }
        });
      } else if (type == 5) {
        //do nothing
      } else if (type == 3) {
        this.amountList.forEach((amount) => {
          if (code == amount.codCob) {
            k = +k + +1;
            if (k == 1) {
              vehicleValue = sumaAsegA;
            }
          }
        });
        vehicleValue = sumaAsegA;
      } else {
        vehicleValue = sumaAsegA;
      }

      var sumInsured = isMandatory ? vehicleValue : isSelect ? selectedOpt : 0;
      var hasCounterpart = false;
      if (isSelect) {
        options.forEach((o)=> {
          if (o == sumInsured) {
            hasCounterpart = true;
          }
        });
        //if has no counterpart to sum insured select options, adds the sumInsured value
        if (!hasCounterpart) {
          options.push({
            value: sumInsured
          });
        }
      }

      var returnObj = {
        isMandatory: isMandatory,
        included: isMandatory,
        code: code,
        coverage: name,
        options: options,
        sumInsured: sumInsured,
        netPremium: netPremium,
        isRoadAssist: (code == '1027' || code == '1029' || code == '1040'),
        isSelect: isSelect
      }

      if (code != '1018' && code != '1037' && code != '1026' && !(code == '1036' && product == 10001)) {
        returnData.push(returnObj);
      }
    });

    return returnData;
  };
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef < DialogOverviewExampleDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(b: boolean): void {
    this.dialogRef.close(b);
  }
}
// function generateCoverageAmountByProduct(obj, quoteDetail, isLoadQuotation) {
export class ModalDTO {
  status: string = "Error";
  message: string = "Application returns error. Please contact administrator.";
  isConfirm: boolean;
  isOkay: boolean = true;
  isClose: boolean;
  isCancel: boolean;

  constructor() {}
}

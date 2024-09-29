import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class MessageSweetAlertService {

  private constructor() {}

  static info(mensagem: string) {
      Swal.fire({
          title: 'Warning!',
          text: mensagem,
          icon: 'info',
          confirmButtonText: 'OK'
      });
  }

  static successWithReload(message : string){
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: "Save"
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload()
      }
    });
  }

  static error(mensagem: string) {
      Swal.fire({
          title: 'Error!',
          text: mensagem,
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }

  static success(mensagem: string) {
      Swal.fire({
        title: 'Success!',
        text: mensagem,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  }
}

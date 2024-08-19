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

  static erro(mensagem: string) {
      Swal.fire({
          title: 'Erro!',
          text: mensagem,
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }

  static sucesso(mensagem: string) {
      Swal.fire({
        title: 'Sucesso!',
        text: mensagem,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  }
}

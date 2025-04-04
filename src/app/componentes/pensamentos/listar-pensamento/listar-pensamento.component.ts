import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  // listaPensamentos: Pensamento[] = [
  //   {
  //     conteudo: 'Passo informações para o componente filho',
  //     autoria: 'Componente pai',
  //     modelo: 'modelo3'
  //   },
  //   {
  //     conteudo: 'Minha propriedade é decorada com @Input',
  //     autoria: 'Componente filho',
  //     modelo: 'modelo2'
  //   },
  //   {
  //     conteudo: 'Esse é um pensamento para realizar o teste de formatação. Queremos validar se quando temos um pensamento maior que o tamanho pré-definido(256 caracteres). Com isso precisamos então colocar um pensamento bem mais longo, para que o car do pensamento tenha uma largura maior, assim conseguiremos validar as formatações e entender melhor o como vai funcionar o esquema...',
  //     autoria: 'Formatador',
  //     modelo: 'modelo1'
  //   }
  // ];
  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosResponse) => {
      this.listaPensamentos = listaPensamentosResponse;
    });
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosResponse) => {
      this.listaPensamentos.push(...listaPensamentosResponse);
      if(!listaPensamentosResponse.length){
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosResponse) => {
      this.listaPensamentos = listaPensamentosResponse;
    });
  }

  listarFavoritos(){
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosFavoritos) => {
      this.listaPensamentos = listaPensamentosFavoritos;
      this.listaFavoritos = listaPensamentosFavoritos;
    });

  }
}

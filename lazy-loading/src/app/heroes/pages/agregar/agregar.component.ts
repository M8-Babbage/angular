import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 50px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
    {
      id: 'Github Army',
      desc: 'Github - Army',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe((res) => {
        this.mostrarSnakbar(`${this.heroe.superhero} ha sido actualizado`);
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakbar(
          `${this.heroe.superhero} ha sido creado correctamente`
        );
      });
    }
  }

  borrarHeroe(): void {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(['/heroes']);
          this.mostrarSnakbar(
            `${this.heroe.superhero} ha sido eliminado correctamente`
          );
        });
      }
    });
  }

  mostrarSnakbar(message: string): void {
    this._snackBar.open(message, 'Ok!', {
      duration: 5000,
    });
  }
}

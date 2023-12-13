import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-info-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.sass']
})
export class UserInfoPageComponent implements OnInit {
  // Inyección de dependencias
  private usersService = inject(UsersService);

  // Definición y declaración de variables
  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public computedName = computed(() => {
    if (!this.currentUser()) {
      return 'Usuario no encontrado'
    }
    return this.currentUser()?.first_name + ' ' + this.currentUser()?.last_name;
  })
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  public loadUser(id: number): void {
    if (id <= 0) return;
    this.userId.set(id);
    this.currentUser.set(undefined);
    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: (error) => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    });
  }
}

import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigation, guestNavigation, NavItem } from '@/app/shared/config/routes/navigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly isAuthorized = computed(() => !!localStorage.getItem('accessToken'));

  readonly navigation = computed<NavItem[]>(() =>
    this.isAuthorized() ? navigation : guestNavigation,
  );

  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleBodyScroll();
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.toggleBodyScroll();
  }

  private toggleBodyScroll(): void {
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape')
  onEscPress(): void {
    if (this.isSidebarOpen) this.closeSidebar();
  }
}

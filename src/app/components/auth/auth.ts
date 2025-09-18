import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NzSwitchModule, NzButtonModule, NzIconModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnInit, OnDestroy {
  constructor(private title: Title, private router: Router) {
    this.setTitleBasedOnAction();
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  public Action: string = 'SignIn';
  public CurrentTheme?: string;
  private themeSub?: Subscription;

  private setTitleBasedOnAction(): void {
    this.Action === 'SignIn'
      ? this.title.setTitle('Tbilink - Authorization')
      : this.Action === 'SignUp'
      ? this.title.setTitle('Tbilink - Sign Up')
      : this.title.setTitle('Tbilink - Password Recovery');
  }

  toggleFormSelector(method: string): void {
    this.Action =
      method === 'SignIn'
        ? 'SignIn'
        : method === 'SignUp'
        ? 'SignUp'
        : method === 'Recovery'
        ? 'Recovery'
        : method === 'EnterCode'
        ? 'EnterCode'
        : method === 'EnterNewPassword'
        ? 'EnterNewPassword'
        : '';
  }

  otp: string[] = ['', '', '', '', '', ''];
  otpDigits = Array(6);

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d$/.test(value)) {
      this.otp[index] = '';
      input.value = '';
      return;
    }

    this.otp[index] = value;

    const next = input.nextElementSibling as HTMLInputElement;
    if (next) next.focus();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      this.otp[index] = '';
      if (input.value === '' && index > 0) {
        const prev = input.previousElementSibling as HTMLInputElement;
        if (prev) prev.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text')?.trim();

    if (!pasted || !/^\d{6}$/.test(pasted)) return;

    const inputs = document.querySelectorAll(
      '.otp-input'
    ) as NodeListOf<HTMLInputElement>;

    pasted.split('').forEach((char, i) => {
      this.otp[i] = char;
      if (inputs[i]) inputs[i].value = char;
    });

    inputs[5]?.focus();
  }

  getOtp(): string {
    return this.otp.join('');
  }
}

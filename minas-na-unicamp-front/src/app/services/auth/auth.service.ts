import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.userData != null) ? this.userData.user.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.userData !== null) ? this.userData.uid : '';
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['formulario']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        throw error;
      });
  }

  // Sign in anonymously
  anonymousLogin() {
    return this.afAuth.signInAnonymously()
      .then((user) => {
        this.userData = user;
        this.ngZone.run(() => {
          this.router.navigate(['formulario']);
        });
      }
    )
      .catch(error => console.log(error));
  }

  // Sign up with email/password
  signUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the sendVerificationMail() function when new user sign up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        throw error;
      });
  }

  // Send email verification when new user sign up
  async sendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      this.router.navigate(['confirmacao-email']);
    });
  }

  // Reset Forgot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then()
      .catch((error) => {
        throw error;
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) || this.isUserAnonymousLoggedIn;
  }

  /* Setting up user data when sign in with username/password, sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}

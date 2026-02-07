export const a = ''

// import { reactive } from 'vue'
// import { LS, type Gender, type PhoneNumber, defaultUserPermission, User, cicKitStore, authorization, provider, useRouteTo, toast, phoneNumberFromString } from 'cic-kit';
// import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
// const LAST_SEEN_TTL_DAYS = 30;

// export interface UserData {
//   uid: string | null | false
//   loginEmail: string | null
//   displayName: string | null
// }

// class AuthClass {
//   uid: string | null | false = false
//   loginEmail: string | null = null
//   displayName: string | null = null
//   user: User | undefined = undefined
//   onLoginDone: boolean = false
//   lastSeenInterval: number | undefined;

//   private setLoginUser(uid: string | null, loginEmail: string | null, displayName: string | null) {
//     this.uid = uid
//     this.loginEmail = loginEmail
//     this.displayName = displayName
//   }

//   async loginWithGoogle(): Promise<void> {
//     try {
//       const result = await signInWithPopup(authorization, provider)
//       const loginUser = result.user
//       this.setLoginUser(loginUser.uid, loginUser.email, loginUser.displayName);

//       toast.log('route to before login')

//       console.log('Login riuscito:', this.displayName)
//     } catch (error) {
//       console.error('Errore nel login:', error)
//     }
//   }


//   async logout() {

//     try {
//       await signOut(authorization);
//       toast.log('route to login')
//       // router.push({ name: 'login' })
//     } catch (error) {
//       console.error('Logout failed', error);
//     }

//     this.setLoginUser(null, null, null);
//     cicKitStore.debugMod = false;
//     this.onLoginDone = false;
//   }

//   checkAuth() {

//     onAuthStateChanged(authorization, async (loginUser) => {
//       if (loginUser) {
//         this.setLastLogin();
//         this.setLoginUser(loginUser.uid, loginUser.email, loginUser.displayName);
//         consoleLogGoogleLogin(this.displayName)
//         try {
//           this.user = await User.get(loginUser.uid)
//           if (this.isSuperAdmin) {
//             cicKitStore.debugMod = !!(LS.getParsed(LS.defaultKey.debugMod));
//           }
//         } catch (error) {
//           try {
//             const docs = LS.getParsed(LS.defaultKey.currentUser)
//             if (docs) {
//               for (const _ in docs) {
//                 this.user = new User(docs[loginUser.uid])
//               }
//               toast.info('localGet user')
//             }
//           } catch (error) {
//             toast.error('Error localGet user')
//           }

//         }

//         if (!this.user) {

//           const raw = (loginUser.displayName ?? '').trim()
//           let name = ''
//           let surname = ''

//           if (raw) {
//             const [first, ...rest] = raw.split(/\s+/)
//             name = first ?? ''
//             surname = rest.join(' ')
//           }

//           const newUser = new User({
//             id: loginUser.uid,
//             name,
//             surname,
//             email: loginUser.email ?? '',
//             phoneNumber: loginUser.phoneNumber ? phoneNumberFromString(loginUser.phoneNumber) : undefined,
//             photoURL: loginUser.photoURL ?? undefined,
//             permissions: [],
//             userPublicId: loginUser.uid,
//           })
//           await newUser.create();
//           toast.log('route to before home')
//         }
//         this.onLoginDone = true;
//       } else {
//         this.logout();
//       }
//     })
//   }

//   /**
//  * Verifica se l'ultimo accesso dell'utente salvato in localStorage è scaduto.
//  * @returns true se l'utente deve essere considerato NON valido (mai visto o TTL superato)
//  */
//   checkLastLogin(): boolean {
//     const lastSeen = Number(LS.getStr(LS.defaultKey.lastLoginCurrentUser));
//     if (!lastSeen) return true;
//     const LAST_SEEN_TTL_MS = LAST_SEEN_TTL_DAYS * 24 * 60 * 60 * 1000;
//     return Date.now() - lastSeen > LAST_SEEN_TTL_MS;
//   }
//   setLastLogin() {
//     LS.set(LS.defaultKey.lastLoginCurrentUser, Date.now());
//   }

//   get isLoginChecked(): boolean {
//     return this.uid !== false
//   }

//   get isLoggedIn(): boolean {
//     return this.uid !== null && this.uid !== false
//   }

//   get isSuperAdmin(): boolean {
//     return this.isLoggedIn ? (OOOOOAuth.user?.hasPermission(defaultUserPermission.SUPERADMIN) ?? false) : false
//   }

//   get isAdmin(): boolean {
//     return this.isLoggedIn ? (OOOOOAuth.user?.hasPermission(defaultUserPermission.ADMIN) ?? false) : false
//   }
// }

// export const OOOOOAuth = reactive(new AuthClass())


// //###########################################################################
// //###########################################################################
// //###########################################################################
// //###########################################################################
// // UTILITY
// function consoleLogGoogleLogin(name: string | null) {
//   console.log(
//     "%cG%co%cg%cg%cl%ce %cLogin:%c " + name,
//     "color:#4285F4; font-weight:bold;",
//     "color:#EA4335; font-weight:bold;",
//     "color:#FBBC05; font-weight:bold;",
//     "color:#4285F4; font-weight:bold;",
//     "color:#34A853; font-weight:bold;",
//     "color:#EA4335; font-weight:bold;",
//     "color:inherit; font-weight:normal;",
//     "color:#2fe7ff; font-weight:bold;"
//   );

// }



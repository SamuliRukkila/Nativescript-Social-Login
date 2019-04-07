import { Component } from "@angular/core";
import { tnsOauthLogin } from "./oauth-login";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { AuthService } from "./auth.service";

@Component({
	selector: "ns-app",
	moduleId: module.id,
	templateUrl: "./app.component.html"
})
export class AppComponent {

	constructor(private _authService: AuthService) { }

	// Sosiaalinen kirjautumis -funktio
	public socialLogin(platform: string): void {
		// Kutsu oauth-login.ts -tiedostossa olevaa funktiota
		tnsOauthLogin(platform)
			// Jos kirjautuminen onnistuu, palautetaan kirjautumisen tiedot (tokenit)
			.then((result: ITnsOAuthTokenResult) => {
				// Viedään tiedot serviceen
				this._authService.socialLogin(result, platform).subscribe(res => {
						if (platform === 'google') {
							console.log('Saatiin Google-käyttäjän tietoja: ');
							console.log(res);
						} else {
							console.log('Saatiin Facebook-käyttäjän tietoja: ');
							console.log(res);
						}
					},
					err => {
						console.error(err);
					}
				);
			}).catch(err => {
				console.error(err);
		});
	}
}

import { TnsOAuthClient, ITnsOAuthTokenResult } from 'nativescript-oauth2';

export function tnsOauthLogin(providerType: string): Promise<ITnsOAuthTokenResult> {

  const client = new TnsOAuthClient(providerType);

  return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
    client.loginWithCompletion(
      (tokenResult: ITnsOAuthTokenResult, error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(tokenResult);
          resolve(tokenResult);
        }
      }
    );
  });
}
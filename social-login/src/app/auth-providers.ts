// Import libraries related to OAuth-library
import { configureTnsOAuth } from 'nativescript-oauth2';
import {
  TnsOaProvider,
  TnsOaProviderOptionsFacebook,
  TnsOaProviderFacebook,
  TnsOaProviderOptionsGoogle,
  TnsOaProviderGoogle
} from 'nativescript-oauth2/providers';


// Google's credentials for social-logging
export function configureOAuthProviderGoogle(): TnsOaProvider {
  const googleProviderOptions: TnsOaProviderOptionsGoogle = {
    openIdSupport: 'oid-full',
    clientId:
      '{{GOOGLE_CLIENT_ID}}.apps.googleusercontent.com',
    redirectUri:
      'com.googleusercontent.apps.{{GOOGLE_CLIENT_ID}}:/auth',
    urlScheme:
      'com.googleusercontent.apps.{{GOOGLE_CLIENT_ID}}',
    scopes: ['email']
  };
  const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);
  return googleProvider;
}

// Facebook's credentials for social-logging
export function configureOAuthProviderFacebook(): TnsOaProvider {
  const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
    openIdSupport: 'oid-none',
    clientId: '{{FB_CLIENT_ID}}',
    clientSecret: '{{FB_CLIENT_SECRET}}',
    redirectUri: 'https://www.facebook.com/connect/login_success.html',
    scopes: ['email']
  };
  const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
  return facebookProvider;
}

// Export all social-platforms for other components
export function configureOAuthProviders() {
  const googleProvider = configureOAuthProviderGoogle();
  const facebookProvider = configureOAuthProviderFacebook();

  configureTnsOAuth([googleProvider, facebookProvider]);
}
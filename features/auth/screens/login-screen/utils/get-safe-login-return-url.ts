const defaultLoginReturnUrl = '/projects';

export function getSafeLoginReturnUrl(returnTo?: string): string {
  if (
    !returnTo ||
    !returnTo.startsWith('/') ||
    returnTo.startsWith('//') ||
    returnTo.includes('\\')
  ) {
    return defaultLoginReturnUrl;
  }

  return returnTo;
}

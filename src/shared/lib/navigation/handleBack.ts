export const createHandleBack = (navigate: (path: string) => void) => () => {
  const referrer = document.referrer;
  const currentHost = window.location.origin;

  if (referrer && referrer.startsWith(currentHost)) {
    window.history.back();
  } else {
    navigate('/home');
  }
};

export const handleBack = () => {
  const referrer = document.referrer;
  const currentHost = window.location.origin;

  if (referrer && referrer.startsWith(currentHost)) {
    window.history.back();
  } else {
    window.location.href = '/home';
  }
};
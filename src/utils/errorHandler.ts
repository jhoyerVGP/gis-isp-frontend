export function getFriendlyErrorMessage(error: any): string {
  // backend message extraction
  const backendMessage =
    error?.response?.data?.message || // axios
    error?.data?.message || // fetch custom
    error?.message; // fallback

  if (
    typeof backendMessage === "string" &&
    backendMessage.trim() !== "" &&
    !/request failed|failed to fetch|network error/i.test(backendMessage)
  ) {
    return backendMessage;
  }

  // status code extraction
  const status = error?.status || error?.response?.status;

  if (!navigator.onLine) {
    return "No tienes conexión a internet. Revisa tu red.";
  }

  if (status >= 500) {
    return "Error interno del servidor. Nuestros ingenieros ya fueron notificados.";
  }

  if (status === 401) {
    return "Credenciales incorrectas. Verifica tu correo y contraseña.";
  }

  return "Ocurrió un error inesperado. Inténtalo de nuevo.";
}

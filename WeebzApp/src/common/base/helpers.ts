declare const Connection;

export function isOnline(): boolean {
  if (navigator.onLine === true)
    return true;

  let connection = (navigator as any).connection;

  if (connection && connection.type)
    return connection.type !== Connection.NONE;

  return false;
}

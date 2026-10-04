/** Respect the Vite base path in development and GitHub project Pages. */
export function registryUrl(name: string) {
  return new URL(
    `${import.meta.env.BASE_URL}r/${name}.json`,
    window.location.origin,
  ).href;
}

export function useIsGithubPages() {
  const isGithubPages = import.meta.env.HOME_IS_GITHUB_PAGES;

  return isGithubPages === 'true';
}

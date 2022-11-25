export const useIsGithubPages = () => {
  const isGithubPages = import.meta.env.HOME_IS_GITHUB_PAGES;

  return isGithubPages === 'true';
};

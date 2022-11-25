export const GithubUserInfoUrl = '';

export interface GithubUser {
  owner: string
  repo: string
  path: string
  email: string
  token: string
}

export interface GetContentResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content: string
  encoding: string
  _links: {
    self: string
    git: string
    html: string
  }
}

export interface GetContentError {
  message: string
  documentation_url: string
}

export interface updateDataResponse {
  content: {
    name: string
    path: string
    sha: string
    type: string
  }
}

export interface updateDataError {
  message: string
  documentation_url: string
}

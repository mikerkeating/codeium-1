import { Octokit } from '@octokit/rest'

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  created_at: string
  updated_at: string
  html_url: string
  user: {
    login: string
    avatar_url: string
  }
  labels: {
    name: string
    color: string
  }[]
  comments: number
}

export async function getGitHubIssues(accessToken: string, owner: string, repo: string) {
  const octokit = new Octokit({
    auth: accessToken,
  })

  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'all',
    per_page: 100,
    sort: 'updated',
    direction: 'desc',
  })

  return data as GitHubIssue[]
}

export async function getGitHubIssue(
  accessToken: string,
  owner: string,
  repo: string,
  issueNumber: number
) {
  const octokit = new Octokit({
    auth: accessToken,
  })

  const { data: issue } = await octokit.issues.get({
    owner,
    repo,
    issue_number: issueNumber,
  })

  const { data: comments } = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: issueNumber,
  })

  return {
    issue,
    comments,
  }
}

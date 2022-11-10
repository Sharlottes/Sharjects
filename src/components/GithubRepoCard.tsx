import React from 'react'
import replaceStringToArray from 'string-replace-to-array'

const getPalette = (dark: boolean) => dark
? {
    background: '#0d1117',
    textColor: '#58a6ff',
    borderColor: '#30363d',
    iconColor: '#8b949e',
  }
: {
    background: 'white',
    textColor: '#0969da',
    borderColor: '#d0d7de',
    iconColor: '#57606a',
  }

export interface GithubRepoCardProps {
    username: string
    repository: string
    dark?: boolean
    fallback?: React.ReactNode
}

interface GithubAPIUserData {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean
}

interface GithubAPIRepoData {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean,
    owner: GithubAPIUserData,
    html_url: string,
    description: string | null,
    fork: boolean,
    url: string,
    forks_url: string,
    keys_url: string,
    collaborators_url: string,
    teams_url: string,
    hooks_url: string,
    issue_events_url: string,
    events_url: string,
    assignees_url: string,
    branches_url: string,
    tags_url: string,
    blobs_url: string,
    git_tags_url: string,
    git_refs_url: string,
    trees_url: string,
    statuses_url: string,
    languages_url: string,
    stargazers_url: string,
    contributors_url: string,
    subscribers_url: string,
    subscription_url: string,
    commits_url: string,
    git_commits_url: string,
    comments_url: string,
    issue_comment_url: string,
    contents_url: string,
    compare_url: string,
    merges_url: string,
    archive_url: string,
    downloads_url: string,
    issues_url: string,
    pulls_url: string,
    milestones_url: string,
    notifications_url: string,
    labels_url: string,
    releases_url: string,
    deployments_url: string,
    created_at: string,
    updated_at: string,
    pushed_at: string,
    git_url: string,
    ssh_url: string,
    clone_url: string,
    svn_url: string,
    homepage: string,
    size: number,
    stargazers_count: number,
    watchers_count: number,
    language: string,
    has_issues: boolean,
    has_projects: boolean,
    has_downloads: boolean,
    has_wiki: boolean,
    has_pages: boolean,
    has_discussions: boolean,
    forks_count: number,
    mirror_url: string | null,
    archived: boolean,
    disabled: boolean,
    open_issues_count: number,
    license: {
      key: string,
      name: string,
      spdx_id: string,
      url: string,
      node_id: string
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: string[],
    visibility: string,
    forks: number,
    open_issues: number,
    watchers: number,
    default_branch: string,
    temp_clone_token: null,
    network_count: number,
    subscribers_count: number,
    source: GithubAPIRepoData,
    parent: GithubAPIRepoData
}

const RepoDescription: React.FC<{ description: string | null, iconColor: string }> = ({ description, iconColor }) => {
    const [emojis, setEmojis] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
        fetch('api/github/emojis')
            .then(res => res.json())
            .then(emojis => setEmojis(emojis))
    }, []);

    let desc = <>{description}</>
    if (description) {
        desc = (
          <>
            {replaceStringToArray(description, /:(\w+):/g, (_, name, offset) => (
              <span key={offset}>
                <img
                  alt={name}
                  src={emojis[name]}
                  style={{ width: '1rem', height: '1rem', verticalAlign: '-0.2rem' }}
                />
              </span>
            ))}
          </>
        )
      }

    return (
        <div style={{
            fontSize: '12px',
            marginBottom: '16px',
            marginTop: '8px',
            color: iconColor,
        }}>
            {desc}
        </div>
    )
}

const LanguageDoat: React.FC<{ language: string }> = ({ language }) => {
    const [colors, setColors] = React.useState<Record<string, { color: string }>>();

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
            .then(res => res.json())
            .then(colors => setColors(colors))
    })

    return <span style={{
        width: '12px',
        height: '12px',
        borderRadius: '100%',
        backgroundColor: colors ? colors[language ?? '']?.color : 'rgba(0,0,0,0)',
        display: 'inline-block',
        top: '1px',
        position: 'relative',
    }} /> 
}

const GithubRepoCard: React.FC<GithubRepoCardProps> = ({ username, repository, dark = false, fallback }) => {
    const palette = getPalette(dark);
    const [data, setData] = React.useState<GithubAPIRepoData>();
    
    React.useEffect(() => {
        fetch(`/api/github/repos/${username}/${repository}`)
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    if(!data) return <></>;

    
    return (
        <div style={{
            fontFamily:
                '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
            border: '1px solid',
            borderColor: palette.borderColor,
            borderRadius: '6px',
            background: palette.background,
            padding: '16px',
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#24292e',
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg
                style={{ fill: palette.iconColor, marginRight: '8px' }}
                viewBox="0 0 16 16"
                version="1.1"
                width={16}
                height={16}
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                />
            </svg>
            <span style={{ fontWeight: 600, color: palette.textColor }}>
                <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={data.html_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {data.name}
                </a>
            </span>
            </div>
            <div style={{
                display: data.fork ? 'block' : 'none',
                fontSize: '12px',
                color: palette.iconColor,
            }}>
                Forked from{' '}
                <a
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    href={data.fork ? data.source?.html_url : ''}
                    target="_blank"
                    rel="noreferrer"
                >
                    {data.fork ? data.source?.full_name : ''}
                </a>
            </div>
            <RepoDescription description={data.description} iconColor={palette.iconColor} />
            <div style={{ fontSize: '12px', color: palette.iconColor, display: 'flex' }}>
                <div style={{ marginRight: '16px' }}>
                    <LanguageDoat language={data.language} />
                    &nbsp;
                    <span>{data.language}</span>
                </div>
                <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={data.html_url + '/stargazers'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div style={{
                        display: data.stargazers_count === 0 ? 'none' : 'flex',
                        alignItems: 'center',
                        marginRight: '16px',
                    }}>
                        <svg
                            style={{ fill: palette.iconColor }}
                            aria-label="stars"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width={16}
                            height={16}
                            role="img"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                            />
                        </svg>
                        &nbsp; <span>{data.stargazers_count}</span>
                    </div>
                </a>
                <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={data.html_url + '/network/members'}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div style={{
                        display: data.forks_count === 0 ? 'none' : 'flex',
                        alignItems: 'center',
                    }}>
                        <svg
                            style={{ fill: palette.iconColor }}
                            aria-label="fork"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width={16}
                            height={16}
                            role="img"
                        >
                            <path
                            fillRule="evenodd"
                            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            />
                        </svg>
                        &nbsp; <span>{data.forks_count}</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default GithubRepoCard;
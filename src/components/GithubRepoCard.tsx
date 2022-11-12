import React from 'react'

import replaceStringToArray from 'string-replace-to-array'

import useTheme from '@mui/system/useTheme'

import type { GithubAPIRepoData } from 'src/@type'
import { useGithubData } from './GithubStaticDataContext'
import FetchSuspenseWrapper from './FetchSuspenseWrapper'
import RepoIcon from 'src/assets/icons/github/RepoIcon'
import StargazerIcon from 'src/assets/icons/github/StargazerIcon'
import ForkIcon from 'src/assets/icons/github/ForkIcon'

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

const EmojisComponent: React.FC<{
    description: string,
    emojis: Record<string, string>
}> = ({ description, emojis }) => <>
    {replaceStringToArray(description, /:(\w+):/g, (_, name, offset) => (
        <span key={offset}>
            <img
                alt={name}
                src={emojis ? emojis[name] : ''}
                style={{ width: '1rem', height: '1rem', verticalAlign: '-0.2rem' }}
            />
        </span>
    ))}
</>

const RepoDescription: React.FC<{ description: string | null, iconColor: string }> = ({ description, iconColor }) => {
    const { getData } = useGithubData();

    let desc = <>{description}</>
    if (description) {
        desc = <FetchSuspenseWrapper<'emojis', typeof EmojisComponent, Record<string, string>>
            fetcher={() => getData('emojis')}
            Component={EmojisComponent}
            fetchedPropName='emojis'
            description={description}
        />
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

const ColoredDoat: React.FC<{ colors: Record<string, { color: string }>, language: string }> = ({ colors, language }) => (
    <span style={{
        width: '12px',
        height: '12px',
        borderRadius: '100%',
        backgroundColor: colors ? colors[language ?? '']?.color : 'rgba(0,0,0,0)',
        display: 'inline-block',
        top: '1px',
        position: 'relative',
    }} />
)

const LanguageDoat: React.FC<{ language: string }> = ({ language }) => {
    const { getData } = useGithubData();

    return (
        <FetchSuspenseWrapper<'colors', typeof ColoredDoat, Record<string, { color: string }>>
            fetcher={() => getData('colors', 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')}
            Component={ColoredDoat}
            fetchedPropName='colors'
            language={language}
        />
    )
}

export interface GithubRepoCardProps {
    username: string
    repository: string
}

const GithubRepoCardFetcher: React.FC<GithubRepoCardProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ username, repository, ...props }) => {
    const { getData } = useGithubData();

    return (
        <FetchSuspenseWrapper
            fetcher={() => getData<GithubAPIRepoData>(repository, `repos/${username}/${repository}`)}
            Component={GithubRepoCard}
            fetchedPropName='data'
            {...props}
        />
    )
}

const GithubRepoCard: React.FC<{ data: GithubAPIRepoData } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({ data, style, ...props }) => {
    const theme = useTheme();
    const palette = getPalette(theme.palette.mode === 'dark');

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
            ...style
        }}
            {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <RepoIcon sx={{ fill: palette.iconColor, marginRight: '8px' }} fontSize='small' />
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
                        <StargazerIcon sx={{ fill: palette.iconColor }} fontSize='small' />
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
                        <ForkIcon sx={{ fill: palette.iconColor }} fontSize='small' />
                        &nbsp; <span>{data.forks_count}</span>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default GithubRepoCardFetcher;
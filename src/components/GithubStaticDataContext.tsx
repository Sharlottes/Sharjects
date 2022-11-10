import React from 'react'

interface StaticDataContextI {
    colors: Record<string, any> | undefined,
    emojis: Record<string, string> | undefined
}

const StaticDataContext = React.createContext<StaticDataContextI>(undefined as any);

const GithubStaticDataContext: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [colors, setColors] = React.useState<StaticDataContextI['colors']>();
  const [emojis, setEmojis] = React.useState<StaticDataContextI['emojis']>();
  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
      .then(res => res.json())
      .then(colors => setColors(colors))
    fetch('api/github/emojis')
      .then(res => res.json())
      .then(emojis => setEmojis(emojis))
  }, []);

  return <StaticDataContext.Provider value={{ colors, emojis }}>
    {children}
  </StaticDataContext.Provider>
}

export const useGithubData = () => {
    return React.useContext<StaticDataContextI>(StaticDataContext);
}

export default GithubStaticDataContext
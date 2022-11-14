import { SvgIcon, type SvgIconProps } from '@mui/material'

const VelogIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
      <path
        fill="#27c999"
        d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3Zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553a14.1 14.1 0 0 0 1.283-2.273c.405-.855.608-1.62.608-2.295c0-.405-.113-.727-.338-.967c-.21-.255-.608-.577-1.193-.967c.6-.765 1.35-1.148 2.25-1.148c.48 0 .878.143 1.193.428c.33.285.494.704.494 1.26c0 .93-.39 2.093-1.17 3.488c-.765 1.38-2.241 3.457-4.431 6.232l-2.227.156l-1.711-9.628h-2.25V7.24c.6-.195 1.305-.406 2.115-.63c.81-.24 1.358-.36 1.643-.36Z" />
    </SvgIcon>
  )
}

export default VelogIcon;
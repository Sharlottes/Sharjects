import React from 'react'
import { useRouter } from 'next/router';

const ErrorPage404: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (router.asPath === router.asPath.toLocaleLowerCase()) {

    }
    else router.replace(router.asPath.toLowerCase())
  }, [])

  if (router.asPath === router.asPath.toLocaleLowerCase()) return (
    <>
      에러 발생!<br />
      <a href='/' style={{ color: 'blue' }}>메인 페이지로 돌아가기</a>
    </>
  )
  else return (
    <>
      정상 페이지로 리다이렉팅 시도중입니다...
    </>
  )
}

export default ErrorPage404;
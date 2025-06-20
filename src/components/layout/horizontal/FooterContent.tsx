'use client'

// React Router Imports
import { Link } from 'react-router-dom'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span className='text-textSecondary'>{` by `}</span>
        <a href='https://pixinvent.com/' target='_blank' rel='noopener noreferrer' className='text-primary uppercase'>
          Pixinvent
        </a>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <a href='https://themeforest.net/licenses/standard' target='_blank' rel='noopener noreferrer' className='text-primary'>
            License
          </a>
          <a href='https://themeforest.net/user/pixinvent/portfolio' target='_blank' rel='noopener noreferrer' className='text-primary'>
            More Themes
          </a>
          <a
            href='https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary'
          >
            Documentation
          </a>
          <a href='https://pixinvent.ticksy.com' target='_blank' rel='noopener noreferrer' className='text-primary'>
            Support
          </a>
        </div>
      )}
    </div>
  )
}

export default FooterContent
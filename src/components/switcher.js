import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from 'react-switch';
import { BsMoonFill as Moon, BsSunFill as Sun } from 'react-icons/bs'

export default class Switcher extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
            <div className="switcher">
                <Switch
                    checked={theme === 'dark'}
                    checkedIcon={<Moon className="moon" />}
                    uncheckedIcon={<Sun className="sun" />}
                    onChange={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            </div>
        )}
      </ThemeToggler>
    )
  }
}
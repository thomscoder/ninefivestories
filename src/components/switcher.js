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
                    checked={theme === "light"}
                    checkedIcon={<Sun className="sun" />}
                    uncheckedIcon={<Moon className="moon" />}
                    onChange={checked => {
                        toggleTheme(theme === 'light' ? 'dark' : 'light')
                    }}
                />
            </div>
        )}
      </ThemeToggler>
    )
  }
}
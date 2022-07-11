import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from 'react-switch';
import { BsMoonFill as Moon, BsSunFill as Sun } from 'react-icons/bs'

export default class Switcher extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    }
  }

  componentDidMount() {
    return typeof window !== 'undefined' && 
      window.localStorage.getItem('theme') === 'light' && 
      this.setState({ checked: true });
  }

  handleChange = (checked, fn)  => {
    const theme = checked ? 'light' : 'dark';
    fn(theme);
    this.setState({ checked });
    const themeChanged = new CustomEvent('theme-change', {detail: {theme}});
    document.dispatchEvent(themeChanged);
  }

  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
            <div className="switcher">
                <Switch
                  checked={this.state.checked}
                  checkedIcon={<Sun className="sun" />}
                  uncheckedIcon={<Moon className="moon" />}
                  onChange={(checked) => this.handleChange(checked, toggleTheme)}
                />
            </div>
        )}
      </ThemeToggler>
    )
  }
}
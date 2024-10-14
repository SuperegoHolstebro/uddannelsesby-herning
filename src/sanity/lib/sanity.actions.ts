import {EyeOpenIcon, EyeClosedIcon} from '@sanity/icons'

export function createVisualAction(originalAction) {
  const BetterButtonAction = (props) => {
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      tone: 'critical',
      icon: originalResult.disabled ? EyeOpenIcon : EyeClosedIcon,
    }
  }
  return BetterButtonAction
}


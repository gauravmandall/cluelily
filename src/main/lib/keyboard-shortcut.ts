import { globalShortcut } from 'electron'

export interface IKeyboardShortcutHelper {
  moveWindowLeft: () => void
  moveWindowRight: () => void
  moveWindowUp: () => void
  moveWindowDown: () => void
}

export class KeyboardShortcutHelper {
  private deps: IKeyboardShortcutHelper

  constructor(deps: IKeyboardShortcutHelper) {
    this.deps = deps
  }

  public registerGlobalShortcuts(): void {
    globalShortcut.register('CommandOrControl+Left', () => {
      console.log('moveWindowLeft')
      this.deps.moveWindowLeft()
    })
    globalShortcut.register('CommandOrControl+Right', () => {
      console.log('moveWindowRight')
      this.deps.moveWindowRight()
    })
    globalShortcut.register('CommandOrControl+Up', () => {
      console.log('moveWindowUp')
      this.deps.moveWindowUp()
    })
    globalShortcut.register('CommandOrControl+Down', () => {
      console.log('moveWindowDown')
      this.deps.moveWindowDown()
    })
  }
}

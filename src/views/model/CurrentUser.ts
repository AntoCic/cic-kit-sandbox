import { User, type UserData } from 'cic-kit'

export interface CurrentUserData extends UserData {
  testCurrent: string
}

export class CurrentUser extends User {
  testCurrent: string

  constructor(data: CurrentUserData) {
    super(data)
    this.testCurrent = data.testCurrent
  }

  override toData(): CurrentUserData {
    return {
      ...super.toData(),
      testCurrent: this.testCurrent,
    }
  }
}

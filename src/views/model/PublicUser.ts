import { User, type UserData } from 'cic-kit'

export interface PublicUserData extends UserData {
  testPublic: string
}

export class PublicUser extends User {
  testPublic: string

  constructor(data: PublicUserData) {
    super(data)
    this.testPublic = data.testPublic
  }

  override toData(): PublicUserData {
    return {
      ...super.toData(),
      testPublic: this.testPublic,
    }
  }
}

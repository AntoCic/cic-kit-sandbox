// src/models/Announcement.ts
import { FirestoreModel, type Timestampble } from 'cic-kit'

export interface AnnouncementData extends Partial<Timestampble> {
  id: string
  type: string
  text: string
}

export class Announcement extends FirestoreModel<AnnouncementData> {
  static collectionName = 'announcements'

  type: string
  text: string

  constructor(data: AnnouncementData) {
    super(data)
    this.type = data.type
    this.text = data.text
  }

  toData(): AnnouncementData {
    return {
      id: this.id,
      type: this.type,
      text: this.text,
      ...this.timestampbleProps()
    }
  }

}

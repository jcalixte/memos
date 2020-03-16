import PouchDB from 'pouchdb-browser'
import { Memo } from '@/models/Memo'

class Repository {
  private db = new PouchDB('memos')

  public async save(memo: Memo) {
    try {
      await this.db.put({
        ...memo,
        _id: memo._id
      })
      return true
    } catch (error) {
      return false
    }
  }
}

export const repository = new Repository()

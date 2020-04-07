import PouchDB from 'pouchdb-browser'
import { MemoModel } from '@/models/Memo'
import { Model } from '@/models/Model'

class Repository {
  private db = new PouchDB('memos')

  public async get<T extends Model>(_id: string): Promise<T | null> {
    try {
      return (await this.db.get(_id)) as T
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async getAll() {
    const docs = await this.db.allDocs({
      include_docs: true
    })

    return docs.rows.map((row) => row.doc)
  }

  public async save(memo: MemoModel) {
    try {
      await this.db.put({
        ...memo,
        _id: memo._id
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public async putAttachment(
    _id: string,
    attachmentId: string,
    file: File,
    type: string
  ) {
    try {
      const doc = await this.db.get(_id)
      await this.db.putAttachment(_id, attachmentId, doc._rev, file, type)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public async remove(id: string) {
    try {
      const doc = await this.db.get<Model>(id)
      doc._deleted = true
      await this.db.put(doc)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export const repository = new Repository()

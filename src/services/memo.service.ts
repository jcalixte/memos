import { v4 as uuid } from 'uuid'
import { Memo, MemoModel } from '@/models/Memo'
import { repository } from './repository'

class MemoService {
  public async get(id: string) {
    return await repository.get<MemoModel>(id)
  }

  public async getAll(): Promise<MemoModel[]> {
    return (await repository.getAll()) as MemoModel[]
  }

  public async save(memo: Memo) {
    if (!memo._id) {
      memo._id = `memo-${Date.now()}-${uuid()}`
    }
    const result = await repository.save(this.sanitize(memo))

    if (result) {
      if (memo.coverPicture) {
        await repository.putAttachment(
          memo._id,
          memo.coverPicture.uuid,
          memo.coverPicture.file,
          memo.coverPicture.file.type
        )
      }

      for (const picture of memo.pictures) {
        await repository.putAttachment(
          memo._id,
          picture.uuid,
          picture.file,
          picture.file.type
        )
      }
    }
  }

  public sanitize(memo: Memo): MemoModel {
    return {
      _id: memo._id,
      _rev: memo._rev,
      _deleted: memo._deleted,
      title: memo.title,
      content: memo.content,
      date: new Date(memo.date),
      location: memo.location,
      coverPicture: memo.coverPicture
        ? {
            uuid: memo.coverPicture.uuid
          }
        : null,
      pictures: memo.pictures.map((picture) => ({
        uuid: picture.uuid,
        location: picture.location,
        meta: picture.meta
      }))
    }
  }

  public async remove(id: string): Promise<boolean> {
    return await repository.remove(id)
  }
}

export const memoService = new MemoService()

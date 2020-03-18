import { Memo } from '@/models/Memo'
import { repository } from './repository'

class MemoService {
  public async save(memo: Memo) {
    if (!memo._id) {
      memo._id = `memo-${Date.now()}-${Math.round(Math.random() * 1000)}`
    }
    return await repository.save(memo)
  }
}

export const memoService = new MemoService()

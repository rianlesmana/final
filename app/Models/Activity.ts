import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userName: string

  @column()
  public nameActivity: string

  @column()
  public unit: string

  @column()
  public price: string

  @column()
  public totalPrice: string

  @column()
  public status: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

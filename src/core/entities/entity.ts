import { UniqueEntityID } from "./unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id(){
    return this._id
  }

  public constructor(props: Props, id?: string){
    this._id = new UniqueEntityID(id)
    this.props = props
  }
}
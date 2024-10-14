interface Section {
  _type: string
  amount?: number
  design?: {
    padding?: {
      spacingTop?: string
      spacingBottom?: string
    }
    color?: {
      color?: string
    }
  }
  innerBlocks?: any[]
  [key: string]: any // To allow additional properties specific to different section types
}

export interface PageBuilderTypes {
  sections: Section[]
}

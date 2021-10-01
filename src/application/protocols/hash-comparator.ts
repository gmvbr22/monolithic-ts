export interface HashComparator {
  compare(password: string, hash: string): Promise<boolean>
}

export const HashComparatorS = Symbol.for('HashComparator')

import { DefinedInitialDataOptions } from '@packages/ui/providers/index'

export type TInputQuery<P, D> = {
  payload?: P
  options?: Omit<DefinedInitialDataOptions<D>, 'initialData' | 'queryKey'>
}

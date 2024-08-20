'use client'

import { CopyIcon } from "@packages/ui/icons/index"
import { useMemo } from "react"
import { toast } from 'sonner'
import { useCopyToClipboard } from "usehooks-ts"

type Props = {
  value: string
}

export const TextCopy: React.FC<Props> = ({ value }) => {
  const [, onCopy] = useCopyToClipboard()
  const filterAddr = useMemo(() => {
    const arr = value.split('/')
    return `${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}/${arr[5]}/.../${arr[arr.length - 2]}/${arr[arr.length - 1]}`
  }, [value])
  return (
    <div className="bg-muted rounded p-1 flex items-center gap-4 w-fit">
      <span>{filterAddr}</span>
      <CopyIcon size={14} className="cursor-pointer" onClick={() => onCopy(value).then(() => {
        toast.success('Copied')
      })} />
    </div>
  )
}

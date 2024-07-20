'use client'

import {
  PaginationContent,
  PaginationItem,
  Pagination as PaginationLib,
  PaginationNext,
  PaginationPrevious,
} from '@packages/ui/components/index'

type Props = {
  onPrev: () => void
  onNext: () => void
}

export const Pagination: React.FC<Props> = ({ onPrev, onNext }) => {
  return (
    <PaginationLib className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={onPrev} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </PaginationLib>
  )
}
